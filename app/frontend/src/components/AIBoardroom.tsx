import React, { useState } from 'react';
import { ContextRouter } from '../router/ContextRouter';

// AI Boardroom and Floating Action Bar integrating streaming chat and multi-agent views
export const AIBoardroom: React.FC = () => {
  const [boardroomActive, setBoardroomActive] = useState(false);
  const [activePersona, setActivePersona] = useState<string | null>(null);

  const personas = ['AI-CFO', 'AI-CMO', 'AI-COO'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          CxO-Friend Boardroom
        </h1>
        <button 
          onClick={() => setBoardroomActive(!boardroomActive)}
          className={`px-4 py-2 rounded-full font-medium transition ${boardroomActive ? 'bg-red-100 text-red-600' : 'bg-indigo-600 text-white'}`}
        >
          {boardroomActive ? 'End Boardroom Meeting' : 'Start Boardroom Session'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Personas Sidebar */}
        <aside className="w-64 bg-white border-r p-4 overflow-y-auto hidden md:block">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Executive Team</h3>
          <ul className="space-y-2">
            {personas.map(persona => (
              <li key={persona}>
                <button
                  onClick={() => setActivePersona(persona)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition ${activePersona === persona ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'hover:bg-gray-50'}`}
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mr-3 flex items-center justify-center text-white text-xs font-bold">
                    {persona.split('-')[1]}
                  </span>
                  <span className="font-medium">{persona}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <ContextRouter />
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl border border-gray-200 px-6 py-3 flex items-center space-x-6 z-50">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-medium">System Ready</span>
        </div>
        <div className="w-px h-6 bg-gray-200"></div>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center">
          <span className="mr-2">🎤</span> Hey Friend
        </button>
        <button className="text-gray-600 hover:text-gray-900 text-sm">
          Workspace Actions
        </button>
      </div>
    </div>
  );
};
