import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface AddCastingCallProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddCastingCall: React.FC<AddCastingCallProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    role: 'actor',
    description: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('casting_calls')
        .insert([formData]);

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding casting call:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Casting Call</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="actor">Actor/Actress</option>
              <option value="crew">Crew Member</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Casting Call'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCastingCall;