import React from 'react';
import { Film, UserPlus, LogIn, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  setShowSignUp: (show: boolean) => void;
  setShowLogin: (show: boolean) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, setShowSignUp, setShowLogin, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Film size={24} />
          <h1 className="text-2xl font-bold">FilmCrew Connect</h1>
        </div>
        <nav>
          {isLoggedIn ? (
            <button onClick={onLogout} className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            <div className="space-x-4">
              <button
                onClick={() => setShowSignUp(true)}
                className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;