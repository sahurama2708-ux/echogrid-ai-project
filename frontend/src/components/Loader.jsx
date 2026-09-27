import React from 'react';
import { Shield, Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Image with Dark Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-105 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb18f86f6?q=80&w=1920&auto=format&fit=crop')` 
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50"></div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center px-4">
        <div className="p-4 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-2xl shadow-blue-500/20 animate-pulse">
          <Shield className="w-12 h-12" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold tracking-wider text-white">
            EchoGrid-<span className="text-blue-400">AI</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-xs">
            Smarter Detection. Safer Tomorrow. Initializing AI Systems...
          </p>
        </div>

        <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold pt-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading secure environment...</span>
        </div>
      </div>
    </div>
  );
}