import React from 'react';
import { WorkspaceSwitcher } from '../components/WorkspaceSwitcher';
import { GlobalSearch } from '../components/GlobalSearch';
import { TransliterationToggle } from '../components/TransliterationToggle';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calculator, Cpu, Settings, PhoneCall, Video } from 'lucide-react';

export const SpatialDashboard: React.FC = () => {
  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Creator Studio', path: '/creator', icon: Video },
    { name: 'Finance Studio', path: '/finance', icon: Calculator },
    { name: 'Operations Studio', path: '/operations', icon: Briefcase },
    { name: 'HR Studio', path: '/hr', icon: Users },
    { name: 'Tech & Support', path: '/tech', icon: Cpu },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm relative">
        <div className="p-4 border-b border-gray-100 flex items-center justify-center">
          <WorkspaceSwitcher />
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="mb-4">
            <GlobalSearch />
          </div>
          
          <nav className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Studios</p>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 flex flex-col space-y-2">
          <TransliterationToggle />
          <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 w-full transition">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content Area - Layered Spatial Design */}
      <main className="flex-1 relative bg-gray-100 overflow-hidden flex flex-col">
        {/* Top Header */}
        <header className="h-14 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-end px-6 shadow-sm z-10 sticky top-0">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 transition relative">
              <PhoneCall size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
              U
            </div>
          </div>
        </header>
        
        {/* Layered Content Container */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};
