import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <header className="h-16 bg-cardBg border-b border-cardBorder flex items-center justify-between px-6 shrink-0">
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search anything..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900/90 border border-cardBorder rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl bg-slate-900 border border-cardBorder text-slate-400 hover:text-slate-200 relative transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-cardBorder">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-xs text-white shadow">
            RS
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-tight">Rama Sahu</p>
            <p className="text-[10px] text-slate-400 leading-tight">Student</p>
          </div>
        </div>
      </div>
    </header>
  );
}