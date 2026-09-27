import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 1. Check karein ki pehle se user logged in hai ya nahi (localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('echogrid_user');
    if (savedUser) {
      navigate('/digital-twin'); // Agar ID bani hai toh dobara nahi banani padegi
    }
  }, [navigate]);

  // 2. Real Google Sign-In Integration (Google Identity Services)
  useEffect(() => {
    // Google script load karein
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Apna Google Cloud Console Client ID yahan dalein
          callback: handleGoogleResponse,
        });
      }
    };
  }, []);

  // Google se login hone ke baad real user details decode karna
  const handleGoogleResponse = (response) => {
    try {
      // JWT token ko decode karke user ki real details (Name, Email) nikalna
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const googleUserPayload = JSON.parse(jsonPayload);

      const userData = {
        name: googleUserPayload.name,   // Google account ka asli naam
        email: googleUserPayload.email, // Google account ka asli email
        picture: googleUserPayload.picture,
        provider: 'google'
      };

      // LocalStorage mein save karein taaki dobara login na karna pade
      localStorage.setItem('echogrid_user', JSON.stringify(userData));
      alert(`Welcome, ${userData.name}! Google Sign-In successful.`);
      navigate('/digital-twin');
    } catch (error) {
      console.error('Google decode error:', error);
      alert('Google Sign-In mein kuch dikkat aayi.');
    }
  };

  // Fallback / Direct Trigger for Google Pop-up
  const triggerGoogleLogin = () => {
    if (window.google) {
      // Prompt Google Account Chooser
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Agar popup block ho ya direct button click handle karna ho
          const client = window.google.accounts.oauth2.initTokenClient({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
            scope: 'email profile',
            callback: (tokenResponse) => {
              if (tokenResponse && tokenResponse.access_token) {
                // Fetch user info using access token
                fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    const userData = {
                      name: data.name,
                      email: data.email,
                      picture: data.picture,
                      provider: 'google'
                    };
                    localStorage.setItem('echogrid_user', JSON.stringify(userData));
                    alert(`Welcome, ${userData.name}!`);
                    navigate('/digital-twin');
                  });
              }
            },
          });
          client.requestAccessToken();
        }
      });
    } else {
      alert('Google SDK load ho raha hai, kripya thoda intezaar karein.');
    }
  };

  // Manual Form Submit Handler
  const handleManualRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Kripya sabhi fields bharein!');
      return;
    }

    const userData = { name, email, provider: 'manual' };
    localStorage.setItem('echogrid_user', JSON.stringify(userData));
    alert('EchoGrid ID successfully create ho gayi!');
    navigate('/digital-twin');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full relative shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Create Your EchoGrid ID</h2>
          <p className="text-xs text-slate-400">Enter your details or use your Google account</p>
        </div>

        {/* Real Google Sign-In Button */}
        <button 
          type="button"
          onClick={triggerGoogleLogin}
          className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-md text-xs cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.16 21.39 7.22 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.44 8.13 0 9.87 0 12s.44 3.87 1.2 5.4l4.08-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.16 2.61 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/>
          </svg>
          Sign in with your Google Account
        </button>

        <div className="flex items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="px-3 text-slate-500 text-[10px] uppercase">Or with email</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Manual Registration Form */}
        <form onSubmit={handleManualRegister} className="space-y-4">
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
                onChange={(e) => setEmail(e.target.value)}
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
  );
}