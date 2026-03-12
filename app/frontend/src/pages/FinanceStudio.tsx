import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';

export const FinanceStudio: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Finance Studio</h2>
          <p className="text-sm text-gray-500">Supervised by AI-CFO</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Export Report</button>
          <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm">Run Payroll</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-700">
              <DollarSign size={20} />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" /> +12.5%
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Monthly Revenue</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">$45,231.00</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-100 rounded-lg text-red-700">
              <ArrowDownRight size={20} />
            </div>
            <span className="flex items-center text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
              <ArrowDownRight size={14} className="mr-1" /> -2.4%
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Monthly Expenses</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">$12,450.00</h3>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col border-orange-200 bg-orange-50/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
              <AlertTriangle size={20} />
            </div>
          </div>
          <p className="text-orange-800 text-sm font-medium">AI-CFO Alert</p>
          <p className="text-sm text-gray-700 mt-2">Cash flow gap predicted in Q4 based on current hiring velocity. Recommend pausing non-essential software subscriptions.</p>
          <button className="mt-3 text-orange-700 font-semibold text-sm hover:underline text-left">View Analysis →</button>
        </div>
      </div>

      {/* Lending / Collections specific feature */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800">Lending &amp; Collections</h3>
          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-1 rounded-full">Automated Mode</span>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b">
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Upcoming EMI</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium">Risk Score</th>
                <th className="p-4 font-medium">AI Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">Alpha Corp</td>
                <td className="p-4">$1,200</td>
                <td className="p-4 text-orange-600 font-medium">Tomorrow</td>
                <td className="p-4"><span className="text-green-600 font-medium">Low (12%)</span></td>
                <td className="p-4 text-gray-500">Sent friendly reminder</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">Beta LLC</td>
                <td className="p-4">$4,500</td>
                <td className="p-4 text-red-600 font-bold">Overdue (5 days)</td>
                <td className="p-4"><span className="text-red-600 font-bold">High (85%)</span></td>
                <td className="p-4 text-blue-600 font-medium cursor-pointer hover:underline">Drafting Legal Notice...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
