import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';

// ContextRouter categorizes the chat using Gmail-like labels
// and decides whether to save to Ephemeral Memory (PCC) or Postgres
export const ContextRouter: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  const [activeContext, setActiveContext] = useState<string>('Business Task');

  return (
    <div className="flex flex-col h-full bg-background text-foreground shrink break-all w-full max-w-2xl mx-auto p-4 border rounded shadow-md">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-bold">Context Router</h2>
        <div className="flex space-x-2">
          {['Idea', 'Task', 'Gossip', 'Business Task'].map(label => (
            <button
              key={label}
              onClick={() => setActiveContext(label)}
              className={`px-3 py-1 text-sm rounded ${activeContext === label ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-gray-400 mb-1">{m.role === 'user' ? 'You' : 'AI'} • Context: {m.role === 'user' ? activeContext : 'Anchor'}</span>
            <div className={`p-3 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-200'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something to the AI..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Send
        </button>
      </form>
    </div>
  );
};
