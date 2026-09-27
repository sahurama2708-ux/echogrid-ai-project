import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, LogOut, Shield, CheckCircle, Globe } from 'lucide-react';

export default function Profile() {
  const { user, loginWithEmail, loginWithGoogle, logout } = useAuth();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }
    loginWithEmail(email, password, name || 'Structural Engineer');
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-6 bg-cardBg border border-cardBorder rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            {isRegistering ? 'Create Your EchoGrid ID' : 'Login to EchoGrid-AI'}
          </h2>
          <p className="text-xs text-slate-400">
            {isRegistering ? 'Register with your custom email & password' : 'Access your structural health scans and profile'}
          </p>
        </div>

        {/* Google Quick Login Button */}
        <button 
          onClick={loginWithGoogle}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-cardBorder text-slate-200 text-xs font-semibold flex items-center justify-center gap-3 hover:bg-slate-800 transition shadow-md"
        >
          <Globe className="w-4 h-4 text-blue-400" /> Continue with Google ID
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-cardBorder"></div>
          <span className="px-3 text-[10px] text-slate-500 uppercase">Or custom email ID</span>
          <div className="flex-grow border-t border-cardBorder"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-300">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-cardBorder rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-300">Email ID / Username</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="email" 
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-cardBorder rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-cardBorder rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
          >
            {isRegistering ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[11px] text-blue-400 hover:underline"
          >
            {isRegistering ? 'Already have an ID? Sign in here' : "Don't have an ID? Create new account"}
          </button>
        </div>
      </div>
    );
  }

  // Logged-in Profile View
  return (
    <div className="max-w-xl mx-auto space-y-6 mt-6">
      <div className="bg-cardBg border border-cardBorder rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-cardBorder pb-6">
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md object-cover" 
          />
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              {user.name} <CheckCircle className="w-4 h-4 text-blue-500" />
            </h2>
            <p className="text-xs text-slate-400">{user.email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
              Logged in via {user.provider}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-300">Account Dashboard Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-cardBorder p-4 rounded-xl">
              <span className="text-[10px] text-slate-500">Scanned Structures</span>
              <p className="text-lg font-bold text-slate-100">08 Scans</p>
            </div>
            <div className="bg-slate-900 border border-cardBorder p-4 rounded-xl">
              <span className="text-[10px] text-slate-500">Access Status</span>
              <p className="text-lg font-bold text-emerald-400">Active</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            onClick={logout}
            className="w-full py-2.5 rounded-xl bg-rose-600/10 border border-rose-500/30 text-rose-400 text-xs font-semibold hover:bg-rose-600/20 transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout Current Profile
          </button>
        </div>
      </div>
    </div>
  );
}