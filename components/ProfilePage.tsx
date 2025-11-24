
import React, { useState, useEffect, useRef } from 'react';
import { UserSession } from '../types';

interface ProfilePageProps {
  user: UserSession;
  onLogout: () => void;
  onBack: () => void;
  onUpdateProfile: (data: Partial<UserSession>) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onBack, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
      name: user.name,
      email: user.email,
      avatar: user.avatar
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      setFormData({
          name: user.name,
          email: user.email,
          avatar: user.avatar
      });
  }, [user]);

  const handleSave = () => {
      onUpdateProfile(formData);
      setIsEditing(false);
  };

  const handleAvatarClick = () => {
      if (isEditing) {
          fileInputRef.current?.click();
      }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
              if (evt.target?.result) {
                  setFormData(prev => ({ ...prev, avatar: evt.target!.result as string }));
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const StatCard = ({ label, value, icon, color }: any) => (
    <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
        <div className={`w-10 h-10 rounded-lg ${color} bg-opacity-20 flex items-center justify-center mb-4 text-white`}>
            {icon}
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-12 overflow-y-auto">
        {/* Header Background */}
        <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-background pointer-events-none -z-10"></div>
        
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Back Button */}
            <button 
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Editor
            </button>

            {/* Profile Header */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                         user.plan === 'Pro' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-gray-700 text-gray-300'
                     }`}>
                         {user.plan} Plan
                     </span>
                 </div>
                 
                 <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                     <div className={`w-32 h-32 rounded-full border-4 border-surface overflow-hidden shadow-2xl ${isEditing ? 'ring-4 ring-primary ring-opacity-50' : ''}`}>
                         <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
                     </div>
                     {isEditing && (
                         <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         </div>
                     )}
                     <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                 </div>

                 <div className="text-center md:text-left flex-1 w-full max-w-lg">
                     {isEditing ? (
                         <div className="space-y-4">
                             <div>
                                 <label className="block text-xs text-gray-400 mb-1">Full Name</label>
                                 <input 
                                     type="text" 
                                     value={formData.name}
                                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                                     className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs text-gray-400 mb-1">Email Address</label>
                                 <input 
                                     type="email" 
                                     value={formData.email}
                                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                                     className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                 />
                             </div>
                         </div>
                     ) : (
                         <>
                            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                            <p className="text-gray-400 mb-4">{user.email} • Member since {user.memberSince}</p>
                         </>
                     )}
                     
                     <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                         {isEditing ? (
                             <>
                                <button onClick={handleSave} className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors text-sm font-bold text-white shadow-lg">Save Changes</button>
                                <button onClick={() => { setIsEditing(false); setFormData(user); }} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium">Cancel</button>
                             </>
                         ) : (
                             <>
                                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">Edit Profile</button>
                                <button className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">Change Password</button>
                                <button onClick={onLogout} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium">Log Out</button>
                             </>
                         )}
                     </div>
                 </div>
            </div>

            {/* Stats Grid */}
            <h2 className="text-xl font-bold mb-4 px-2">Usage Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <StatCard 
                    label="Workflows Created" 
                    value={user.stats.workflowsCreated} 
                    color="bg-blue-500"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                />
                <StatCard 
                    label="Images Generated" 
                    value={user.stats.imagesGenerated} 
                    color="bg-purple-500"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                />
                <StatCard 
                    label="Videos Generated" 
                    value={user.stats.videosGenerated} 
                    color="bg-orange-500"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                />
                <StatCard 
                    label="API Calls" 
                    value={user.stats.apiCalls.toLocaleString()} 
                    color="bg-green-500"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                />
            </div>

            {/* Settings Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass-panel p-6 rounded-2xl border border-white/5">
                     <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        Notifications
                     </h3>
                     <div className="space-y-4">
                         {['Email Digests', 'Generation Complete Alerts', 'Product Updates', 'Community Mentions'].map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                 <span className="text-gray-300">{item}</span>
                                 <div className={`w-10 h-6 rounded-full relative transition-colors ${i < 2 ? 'bg-primary' : 'bg-gray-700'}`}>
                                     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i < 2 ? 'left-5' : 'left-1'}`}></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>

                 <div className="glass-panel p-6 rounded-2xl border border-white/5">
                     <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Security & API
                     </h3>
                     <div className="space-y-4">
                         <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                             <div className="text-xs text-gray-500 uppercase font-bold mb-1">API Key Status</div>
                             <div className="flex items-center justify-between">
                                 <span className="text-green-400 text-sm flex items-center gap-2">● Active</span>
                                 <button className="text-xs text-primary hover:underline">Rotate Key</button>
                             </div>
                         </div>
                         <div className="p-4 bg-black/30 rounded-lg border border-white/5">
                             <div className="text-xs text-gray-500 uppercase font-bold mb-1">2FA Authentication</div>
                             <div className="flex items-center justify-between">
                                 <span className="text-gray-400 text-sm">Not Enabled</span>
                                 <button className="text-xs text-primary hover:underline">Enable</button>
                             </div>
                         </div>
                         <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors">
                             Manage Sessions
                         </button>
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );
};
