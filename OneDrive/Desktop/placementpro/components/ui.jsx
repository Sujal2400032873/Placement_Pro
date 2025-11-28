
import React from 'react';

// --- Button ---
// FIX: Add size prop to allow for different button sizes.
export const Button = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'rounded-md font-semibold text-white transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-corporate-blue-600 hover:bg-corporate-blue-700 focus:ring-corporate-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2',
  };
  return (
    <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Input ---
export const Input = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input id={id} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-corporate-blue-500 focus:border-corporate-blue-500 sm:text-sm" {...props} />
  </div>
);

// --- Card ---
export const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-xl overflow-hidden animate-fade-in ${className}`}>
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- Modal ---
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600 text-2xl px-2 py-1">×</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Spinner ---
export const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate-blue-600"></div>
  </div>
);

// --- Status Badge ---
export const StatusBadge = ({ status }) => {
    const colorClasses = {
        Applied: 'bg-blue-100 text-blue-800',
        Shortlisted: 'bg-yellow-100 text-yellow-800',
        Interview: 'bg-purple-100 text-purple-800',
        Offered: 'bg-green-100 text-green-800',
        Rejected: 'bg-red-100 text-red-800'
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};
