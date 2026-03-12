import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const OperationsStudio: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Operations Studio</h2>
        <p className="text-sm text-gray-500">Process Optimization &amp; Efficiency Intelligence System (POEIS)</p>
      </div>

      {/* POEIS TAT Tracking */}
      <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="mr-2 text-blue-500" size={20} /> Turnaround Time (TAT) Intelligence
        </h3>
        <div className="flex items-center space-x-6">
          <div className="flex-1 p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-500 mb-1">Company Avg vs Expected</p>
            <div className="flex items-end">
              <span className="text-2xl font-bold text-gray-900">4.2h</span>
              <span className="text-sm text-gray-500 ml-2 mb-1">/ 5.0h expected</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
          
          <div className="flex-1 p-4 bg-red-50 rounded-lg border border-red-100">
            <h4 className="text-sm font-semibold text-red-800 flex items-center mb-2">
              <AlertCircle size={14} className="mr-1" /> Bottleneck Detected
            </h4>
            <p className="text-xs text-red-700">
              <strong>HR Onboarding</strong> is averaging 24 hours (Expected: 5 hours). AI-COO suggests automating the document verification phase.
            </p>
            <button className="mt-2 text-xs font-semibold text-white bg-red-600 px-3 py-1.5 rounded hover:bg-red-700">
              Apply AI Automation
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board Mockup */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden pb-4">
        {/* Column 1 */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col h-full border">
          <h3 className="font-semibold text-gray-700 mb-3 flex justify-between">
            To Do <span className="text-gray-400 font-normal">3</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-800">Update Q3 Compliance Docs</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">Ops</span>
                <span className="text-xs text-gray-400">TAT: 48h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col h-full border">
          <h3 className="font-semibold text-gray-700 mb-3 flex justify-between">
            In Progress (AI Assisted) <span className="text-gray-400 font-normal">1</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            <div className="bg-indigo-50 border-indigo-200 p-3 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <p className="text-xs font-bold text-indigo-700 uppercase">AI-COO Executing</p>
              </div>
              <p className="text-sm font-medium text-gray-800">Drafting Standard Operating Procedure for Support</p>
              <div className="w-full bg-indigo-100 rounded-full h-1 mt-3">
                <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="bg-gray-100 rounded-xl p-4 flex flex-col h-full border">
          <h3 className="font-semibold text-gray-700 mb-3 flex justify-between">
            Completed <span className="text-gray-400 font-normal">12</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 opacity-70">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-600 line-through">Vendor Negotiation</p>
                <CheckCircle2 size={16} className="text-green-500" />
              </div>
              <p className="text-xs text-green-600 mt-2 font-medium">TAT: 4h (Saved 6h)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
