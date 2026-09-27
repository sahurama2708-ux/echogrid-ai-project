import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Loader from './components/Loader';
import { Shield, User, Mail, Lock, ArrowRight, X } from 'lucide-react';

// Pages
import Home from './pages/Home';
import HomeDeshboard from './pages/HomeDeshboard';
import DigitalTwin from './pages/DigitalTwin';
import History from './pages/History';
import Profile from './pages/Profile';
import Result from './pages/Result';
import Upload from './pages/Upload';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [isStarted, setIsStarted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Form states for User ID creation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, login, logout } = useAuth();

  // Splash Screen Timer (1.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Persistent Login Check: Agar pehle se user logged in hai, toh seedha dashboard/started state mein bhejein
  useEffect(() => {
    if (user) {
      setIsStarted(true);
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  // Handle Get Started Click
  const handleGetStartedClick = () => {
    if (!user) {
      setShowAuthModal(true); // Agar user logged-in nahi hai toh ID banane ka modal khulega
    } else {
      setIsStarted(true);
    }
  };

  // Handle Form Submit for User ID
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Simulate user creation / login
    const userData = { name: name || 'Operator User', email, provider: 'manual' };
    login(userData); // Context aur localStorage mein user save karega
    setShowAuthModal(false);
    setIsStarted(true);
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = () => {
    const googleUser = {
      name: "Google User",
      email: "user@gmail.com",
      provider: "google"
    };
    login(googleUser); // Context aur localStorage mein user save karega
    setShowAuthModal(false);
    setIsStarted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans overflow-hidden relative">
      {/* Sidebar (Only when started & logged in) */}
      {isStarted && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user} 
          onLogout={() => { logout(); setIsStarted(false); }} 
        />
      )}

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {isStarted && <Header user={user} setActiveTab={setActiveTab} />}

        <main className={`flex-1 ${isStarted ? 'p-6 max-w-7xl w-full mx-auto' : 'p-4 h-screen flex items-center justify-center'}`}>
          {!isStarted ? (
            <div className="w-full h-full flex flex-col">
              <Home 
                setActiveTab={(tab) => { setActiveTab(tab); handleGetStartedClick(); }} 
                onGetStarted={handleGetStartedClick} 
              />
            </div>
          ) : (
            <>
              {activeTab === 'Home' && <HomeDeshboard setActiveTab={setActiveTab} />}
              {activeTab === 'Upload / Camera' && <Upload setActiveTab={setActiveTab} />}
              {activeTab === 'Result' && <Result />}
              {activeTab === 'Digital Twin' && <DigitalTwin />}
              {activeTab === 'Analytics' && <HomeDeshboard setActiveTab={setActiveTab} />}
              {activeTab === 'History' && <History />}
              {activeTab === 'Profile' && <Profile />}
            </>
          )}
        </main>
      </div>

      {/* User ID Creation / Signup Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full relative shadow-2xl space-y-6">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Create Your EchoGrid ID</h2>
              <p className="text-xs text-slate-400">Enter your details to access AI infrastructure monitoring</p>
            </div>

            {/* Google Sign-In Button */}
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-md text-xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.16 21.39 7.22 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.44 8.13 0 9.87 0 12s.44 3.87 1.2 5.4l4.08-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.16 2.61 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="px-3 text-slate-500 text-[10px] uppercase">Or with email</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.email = e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-300">Password / Security Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Create ID & Continue <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}