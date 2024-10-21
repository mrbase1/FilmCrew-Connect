import React, { useState, useEffect } from 'react';
import { Film, Users, UserPlus, LogIn, PlusCircle } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CastingCallList from './components/CastingCallList';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import AddCastingCall from './components/AddCastingCall';
import Notification from './components/Notification';
import { supabase } from './lib/supabaseClient';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAddCastingCall, setShowAddCastingCall] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoggedIn(!!session?.user);
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoggedIn(!!session?.user);
        if (event === 'SIGNED_IN') {
          setNotification({ type: 'success', message: 'Successfully logged in!' });
        } else if (event === 'SIGNED_OUT') {
          setNotification({ type: 'info', message: 'You have been logged out.' });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleAddCastingCallSuccess = () => {
    setNotification({ type: 'success', message: 'Casting call added successfully!' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header isLoggedIn={isLoggedIn} setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoggedIn ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Latest Casting Calls</h2>
              <button
                onClick={() => setShowAddCastingCall(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
              >
                <PlusCircle size={18} className="mr-2" />
                Add Casting Call
              </button>
            </div>
            <CastingCallList />
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to FilmCrew Connect</h1>
            <p className="text-xl mb-8">Find your next role or crew member for your production!</p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <Film size={48} className="mx-auto mb-2 text-blue-600" />
                <h2 className="text-2xl font-semibold mb-2">For Filmmakers</h2>
                <p>Post casting calls and find talent</p>
              </div>
              <div className="text-center">
                <Users size={48} className="mx-auto mb-2 text-green-600" />
                <h2 className="text-2xl font-semibold mb-2">For Actors & Crew</h2>
                <p>Discover opportunities and showcase your skills</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} setNotification={setNotification} />}
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} setNotification={setNotification} />}
      {showAddCastingCall && <AddCastingCall onClose={() => setShowAddCastingCall(false)} onSuccess={handleAddCastingCallSuccess} />}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default App;