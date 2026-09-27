import React from 'react';
import { Shield, Search, AlertTriangle, Bell, Box, ArrowRight } from 'lucide-react';

export default function Home({ setActiveTab, onGetStarted }) {
  return (
    <div className="min-h-full bg-slate-950 text-slate-100 flex flex-col justify-between p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Glow / Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Nav inside Landing */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-sm font-bold tracking-wider text-slate-100">EchoGrid-AI</h1>
        </div>

        

        <button 
          onClick={onGetStarted}
          className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
        >
          Get Started
        </button>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-auto py-12 z-10">
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            EchoGrid-AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Smarter Detection.
            </span> <br />
            Safer Tomorrow.
          </h1>
          <p className="text-xs lg:text-sm text-slate-400 max-w-md leading-relaxed">
            AI-powered disaster management and infrastructure monitoring for a safer, more resilient world[span_2](start_span)[span_2](end_span).
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={onGetStarted}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setActiveTab('Analytics')}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Banner Image Box */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 h-64 lg:h-80 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
          {/* Aap yahan apni actual background disaster/worker image bhi laga sakte hain */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
          <div className="z-20 text-center p-6 space-y-2">
            <Shield className="w-12 h-12 text-blue-500 mx-auto animate-pulse" />
            <span className="text-xs font-bold text-slate-200 block">AI Infrastructure Monitoring Active</span>
            <span className="text-[10px] text-slate-400">Real-time satellite & drone feed analysis</span>
          </div>
        </div>
      </div>

      {/* Bottom Feature Icons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 z-10">
        <div 
          onClick={() => setActiveTab('Upload / Camera')} 
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-blue-500/50 cursor-pointer transition"
        >
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">AI Crack Detection</h4>
            <span className="text-[9px] text-slate-400">Instant structural analysis</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('Home')} 
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-blue-500/50 cursor-pointer transition"
        >
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Disaster Monitoring</h4>
            <span className="text-[9px] text-slate-400">Risk mapping & zones</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('Home')} 
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-blue-500/50 cursor-pointer transition"
        >
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Real-time Alerts</h4>
            <span className="text-[9px] text-slate-400">Immediate hazard warnings</span>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('Digital Twin')} 
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-blue-500/50 cursor-pointer transition"
        >
          <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">Digital Twin</h4>
            <span className="text-[9px] text-slate-400">3D building mesh view</span>
          </div>
        </div>
      </div>
    </div>
  );
}