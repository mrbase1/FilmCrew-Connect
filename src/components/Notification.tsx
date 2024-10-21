import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const icons = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    info: <AlertCircle className="text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
  };

  return (
    <div className={`fixed top-4 right-4 ${bgColors[type]} border-l-4 border-${type === 'info' ? 'blue' : type}-500 p-4 rounded shadow-md`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 text-${type === 'info' ? 'blue' : type}-500 hover:bg-${type === 'info' ? 'blue' : type}-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type === 'info' ? 'blue' : type}-400`}
            >
              <span className="sr-only">Dismiss</span>
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;