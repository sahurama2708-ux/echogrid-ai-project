import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header({ user, setActiveTab }) {
  return (
    <header className="h-16 border-b border-cardBorder bg-cardBg/30 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-72">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-slate-900 border border-cardBorder rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Right Icons & Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl bg-slate-900 border border-cardBorder text-slate-400 hover:text-white transition relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
        </button>

        <div 
          onClick={() => setActiveTab('Profile')}
          className="flex items-center gap-3 cursor-pointer bg-slate-900 border border-cardBorder px-3 py-1.5 rounded-xl hover:border-blue-500 transition"
        >
          <img 
            src={user?.avatar || "https://ui-avatars.com/api/?name=Rama+Sahu&background=0284c7&color=fff"} 
            alt="User" 
            className="w-7 h-7 rounded-full object-cover border border-blue-500" 
          />
          <div className="text-left">
            <h4 className="text-xs font-bold text-slate-200">{user?.name || 'Rama Sahu'}</h4>
            <span className="text-[9px] text-blue-400 font-medium block">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}