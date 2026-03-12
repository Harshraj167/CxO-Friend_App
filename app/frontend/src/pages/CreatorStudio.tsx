import React, { useState } from 'react';
import { Mail, Shield, TrendingUp, Handshake } from 'lucide-react';

export const CreatorStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inbox');

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b flex justify-between items-center bg-gradient-to-r from-purple-50 to-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="mr-3 text-purple-600" /> Creator Studio
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage brand deals, analyze cross-platform metrics, and shared vaults.</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition shadow-sm">
          + New Rate Card
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b px-6 space-x-6 bg-gray-50/50">
        <button 
          onClick={() => setActiveTab('inbox')}
          className={`py-3 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'inbox' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Brand Inbox (AI Triaged)
        </button>
        <button 
          onClick={() => setActiveTab('vaults')}
          className={`py-3 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'vaults' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Shared Vaults
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'analytics' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Cross-Platform Analytics
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50/20">
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">High Priority (AI Scored > 80)</h3>
            
            {/* Inbox Item */}
            <div className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer flex justify-between items-start">
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Nike Spring Campaign</h4>
                  <p className="text-sm text-gray-600 mt-1">"Hey, we'd love to sponsor 2 Instagram Reels for our new Air Max drop..."</p>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md flex items-center">
                      <Shield size={12} className="mr-1" /> Trust Score: 95/100
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Handshake size={12} className="mr-1" /> Pre-approved vendor
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">$4,500</p>
                <p className="text-xs text-gray-400">Offered</p>
                <button className="mt-3 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded hover:bg-purple-100">
                  AI: Suggest Counter ($5k)
                </button>
              </div>
            </div>

            {/* Inbox Item */}
            <div className="bg-white border rounded-xl p-5 hover:shadow-md transition cursor-pointer flex justify-between items-start">
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Unknown Crypto Brand</h4>
                  <p className="text-sm text-gray-600 mt-1">"Post this link for $10,000 daily returns..."</p>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-md flex items-center">
                      <Shield size={12} className="mr-1" /> Trust Score: 12/100
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button className="mt-8 px-3 py-1 border border-red-200 text-red-600 text-xs font-medium rounded hover:bg-red-50">
                  Move to Spam
                </button>
              </div>
            </div>
            
          </div>
        )}

        {activeTab === 'vaults' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Shield size={48} className="text-purple-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">Secure B2B Collaboration</h3>
            <p className="text-gray-500 max-w-md mt-2">
              Invite external brands to a shared timeline where they can view metrics and approve content without seeing your entire organization's data.
            </p>
            <button className="mt-6 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm">
              Create Shared Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
