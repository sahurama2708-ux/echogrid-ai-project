import React from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, ShieldAlert } from 'lucide-react';

export default function HomeDashboard({ setActiveTab }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-cardBg border border-cardBorder rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Welcome Back, Rama 👋
          </h2>
          <p className="text-xs text-slate-400 mt-1">AI for a safer and stronger tomorrow.</p>
        </div>
        <button 
          onClick={() => setActiveTab('Upload / Camera')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
        >
          Start New Scan
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-cardBg border border-cardBorder rounded-2xl p-4 shadow-md space-y-2">
          <span className="text-[11px] text-slate-400">Total Scanned</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-slate-100">124</h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12%</span>
          </div>
        </div>
        <div className="bg-cardBg border border-cardBorder rounded-2xl p-4 shadow-md space-y-2">
          <span className="text-[11px] text-slate-400">Cracks Detected</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-slate-100">32</h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +5%</span>
          </div>
        </div>
        <div className="bg-cardBg border border-cardBorder rounded-2xl p-4 shadow-md space-y-2">
          <span className="text-[11px] text-slate-400">High Risk</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-rose-400">8</h3>
            <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> +2%</span>
          </div>
        </div>
        <div className="bg-cardBg border border-cardBorder rounded-2xl p-4 shadow-md space-y-2">
          <span className="text-[11px] text-slate-400">Safe Structures</span>
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-emerald-400">84</h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> +18%</span>
          </div>
        </div>
      </div>

      {/* Map & Recent Activity */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-cardBg border border-cardBorder rounded-2xl p-5 shadow-xl h-64 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-200">Live Risk Map</h3>
          <div className="flex-1 bg-slate-900 rounded-xl border border-cardBorder flex items-center justify-center text-slate-500 text-xs">
            [ Interactive Regional Risk Map Rendering ]
          </div>
        </div>

        <div className="bg-cardBg border border-cardBorder rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-200">Recent Activity</h3>
          <div className="space-y-3 text-[11px]">
            <div className="flex items-start gap-2.5 pb-2 border-b border-cardBorder">
              <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">Crack detected in Building A</p>
                <span className="text-[9px] text-slate-500">2 mins ago</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 pb-2 border-b border-cardBorder">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
              <div>
                <p className="text-slate-300 font-medium">New image uploaded</p>
                <span className="text-[9px] text-slate-500">12 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}