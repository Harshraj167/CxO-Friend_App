import React, { useState } from 'react';
import { Building2, ChevronDown, Check } from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  role: string;
}

export const WorkspaceSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [workspaces] = useState<Workspace[]>([
    { id: 'org_1', name: 'Creative Agency Alpha', role: 'Founder' },
    { id: 'org_2', name: 'Architecture Firm Beta', role: 'Consultant' },
  ]);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition w-60 border border-transparent hover:border-gray-200"
      >
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          {activeWorkspace.name.charAt(0)}
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-gray-800 truncate">{activeWorkspace.name}</p>
          <p className="text-xs text-gray-500">{activeWorkspace.role}</p>
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Switch Workspace
          </div>
          <div className="p-2 space-y-1">
            {workspaces.map(ws => (
              <button
                key={ws.id}
                onClick={() => {
                  setActiveWorkspace(ws);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${
                  activeWorkspace.id === ws.id 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Building2 size={16} className={activeWorkspace.id === ws.id ? 'text-blue-500' : 'text-gray-400'} />
                  <span>{ws.name}</span>
                </div>
                {activeWorkspace.id === ws.id && <Check size={16} className="text-blue-600" />}
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-gray-100">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
              + Create or Join Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
