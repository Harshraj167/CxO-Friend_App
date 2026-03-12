import React from 'react';

interface DMCIProps {
  intent: string;
  onConfirm: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

// Dual-Mode Confirmation Interface (DMCI)
// Prevents the AI from taking high-risk actions without explicit user consent.
export const DMCI: React.FC<DMCIProps> = ({ intent, onConfirm, onEdit, onCancel }) => {
  return (
    <div className="my-4 p-4 border-2 border-orange-400 bg-orange-50 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <span className="text-orange-600 font-bold text-lg mr-2">⚠️ Approval Required</span>
      </div>
      <p className="text-gray-800 mb-4">
        The AI intends to execute the following high-risk action:
        <br />
        <span className="font-semibold">{intent}</span>
      </p>
      
      <div className="flex space-x-3">
        <button 
          onClick={onConfirm}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          Confirm Execution
        </button>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition"
        >
          Edit Parameters
        </button>
        <button 
          onClick={onCancel}
          className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded hover:bg-red-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
