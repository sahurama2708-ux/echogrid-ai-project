import React from 'react';
import { Home, Camera, Box, BarChart2, Clock, User, LogOut, Shield } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'Upload / Camera', icon: Camera },
    { name: 'Digital Twin', icon: Box },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'History', icon: Clock },
    { name: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-cardBg border-r border-cardBorder flex flex-col justify-between p-4 shrink-0 select-none">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="p-2 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-100">EchoGrid-AI</h1>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-cardBorder">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}