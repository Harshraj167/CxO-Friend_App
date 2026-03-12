import React, { useState, useEffect } from 'react';
import { Search, Command, FileText, CheckSquare, MessageSquare } from 'lucide-react';

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-lg transition border border-transparent shadow-sm w-64"
      >
        <Search size={16} />
        <span className="text-sm flex-1 text-left">Search everything...</span>
        <div className="flex items-center space-x-1 text-xs font-mono bg-white px-2 py-0.5 rounded border">
          <Command size={12} />
          <span>K</span>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center px-4 border-b">
          <Search size={20} className="text-blue-500 mr-2" />
          <input 
            autoFocus
            type="text"
            className="w-full py-4 text-lg outline-none bg-transparent placeholder-gray-400"
            placeholder="Search tasks, docs, AI chats, and users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-xs text-gray-400 border px-2 py-1 rounded hover:bg-gray-100"
          >
            ESC
          </button>
        </div>

        <div className="p-2 overflow-y-auto">
          {query.length > 0 ? (
            <div className="space-y-4 p-2">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tasks</h4>
                <div className="space-y-1">
                  <div className="flex items-center p-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                    <CheckSquare size={16} className="text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Finalize Q3 Marketing Budget</p>
                      <p className="text-xs text-gray-500">Finance Studio • Assigned to AI-CFO</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Chats</h4>
                <div className="space-y-1">
                  <div className="flex items-center p-2 hover:bg-blue-50 rounded-lg cursor-pointer">
                    <MessageSquare size={16} className="text-purple-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Brainstorm ad copy for new product</p>
                      <p className="text-xs text-gray-500">Context: Idea • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <Search size={48} className="mb-4 opacity-50 text-blue-200" />
              <p className="text-sm">Start typing to search your entire workspace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
