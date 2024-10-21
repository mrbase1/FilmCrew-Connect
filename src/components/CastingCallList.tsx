import React, { useEffect, useState } from 'react';
import { Film, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface CastingCall {
  id: number;
  title: string;
  role: string;
  description: string;
  company: string;
}

const CastingCallList: React.FC = () => {
  const [castingCalls, setCastingCalls] = useState<CastingCall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCastingCalls();
  }, []);

  const fetchCastingCalls = async () => {
    try {
      const { data, error } = await supabase
        .from('casting_calls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCastingCalls(data || []);
    } catch (error) {
      console.error('Error fetching casting calls:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading casting calls...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Latest Casting Calls</h2>
      {castingCalls.length === 0 ? (
        <p className="text-center text-gray-500">No casting calls available at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {castingCalls.map((call) => (
            <div key={call.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{call.title}</h3>
                {call.role.toLowerCase() === 'actor' ? (
                  <User className="text-blue-500" size={24} />
                ) : (
                  <Film className="text-green-500" size={24} />
                )}
              </div>
              <p className="text-gray-600 mb-4">{call.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{call.company}</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CastingCallList;