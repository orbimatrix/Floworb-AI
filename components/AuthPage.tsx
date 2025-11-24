
import React, { useState } from 'react';

interface AuthPageProps {
  onLogin: (email: string, name?: string) => void;
  onNavigateBack: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onNavigateBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For signup, we pass the name. For login, we mock a name if needed, but App.tsx will handle the session.
      onLogin(formData.email, isLogin ? 'Demo User' : formData.name);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-8 glass-panel rounded-3xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
            onClick={onNavigateBack}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl mx-auto mb-4 shadow-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-400 text-sm">
                {isLogin ? 'Enter your credentials to access your workspace.' : 'Join the community of creators today.'}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
            )}
            
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                <input 
                    type="email" 
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div className="space-y-1">
                <div className="flex justify-between ml-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                    {isLogin && <a href="#" className="text-xs text-primary hover:text-primary/80">Forgot?</a>}
                </div>
                <input 
                    type="password" 
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-6"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                    </>
                ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                )}
            </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-white font-bold hover:text-primary transition-colors ml-1"
                >
                    {isLogin ? 'Sign up' : 'Log in'}
                </button>
            </p>
        </div>
        
        {/* Social Proof/Trust */}
        <div className="mt-8 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="h-6 w-20 bg-white/10 rounded"></div>
             <div className="h-6 w-20 bg-white/10 rounded"></div>
             <div className="h-6 w-20 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  );
};
