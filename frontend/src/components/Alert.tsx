import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error'; 
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  if (!message) {
    return null;
  }

  const baseClasses = "fixed top-5 right-5 z-50 flex max-w-sm items-center justify-between rounded-lg p-4 shadow-lg";
  
  const typeClasses = type === 'success'
    ? "border border-green-400 bg-green-100 text-green-700"
    : "border border-red-400 bg-red-100 text-red-700";

  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      <span className="font-medium">{message}</span>
      
      <button 
        onClick={onClose} 
        className="ml-4 text-xl font-bold leading-none"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;