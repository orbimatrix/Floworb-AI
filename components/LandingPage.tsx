
import React, { useState } from 'react';
import { ViewState } from '../types';

interface LandingPageProps {
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
    onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ currentView, onNavigate, onLogin }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // --- Background Animation Component ---
    const AnimatedBackground = () => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
    );

    const Navbar = () => (
        <nav className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto sticky top-0 z-50">
            {/* Glass Background for Nav */}
            <div className="absolute inset-0 bg-background/70 backdrop-blur-md border-b border-white/5 z-[-1]"></div>

            <div 
                className="flex items-center gap-2 cursor-pointer z-50 relative" 
                onClick={() => onNavigate(ViewState.LANDING)}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur opacity-50"></div>
                    <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                </div>
                <span className="font-bold text-xl tracking-tight text-white">FlowGen AI</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-300">
                <button onClick={() => onNavigate(ViewState.FEATURES)} className={`hover:text-white transition-colors relative group ${currentView === ViewState.FEATURES ? 'text-white' : ''}`}>
                    Features
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full ${currentView === ViewState.FEATURES ? 'w-full' : ''}`}></span>
                </button>
                <button onClick={() => onNavigate(ViewState.PRICING)} className={`hover:text-white transition-colors relative group ${currentView === ViewState.PRICING ? 'text-white' : ''}`}>
                    Pricing
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full ${currentView === ViewState.PRICING ? 'w-full' : ''}`}></span>
                </button>
                <button onClick={() => onNavigate(ViewState.LANDING)} className="hover:text-white transition-colors relative group">
                    Resources
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
                </button>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex gap-4">
                <button 
                    onClick={onLogin}
                    className="px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-sm font-medium backdrop-blur-sm"
                >
                    Log In
                </button>
                <button 
                     onClick={onLogin}
                    className="px-5 py-2 bg-white text-black rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm font-bold"
                >
                    Start Building
                </button>
            </div>

            {/* Mobile Hamburger */}
            <button 
                className="md:hidden text-gray-300 z-50 relative p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200">
                    <button onClick={() => { onNavigate(ViewState.FEATURES); setIsMobileMenuOpen(false); }} className="text-2xl font-medium text-gray-300 hover:text-white">Features</button>
                    <button onClick={() => { onNavigate(ViewState.PRICING); setIsMobileMenuOpen(false); }} className="text-2xl font-medium text-gray-300 hover:text-white">Pricing</button>
                    <div className="flex flex-col gap-4 mt-8 w-64">
                        <button onClick={onLogin} className="w-full py-4 border border-white/20 rounded-xl text-center hover:bg-white/10 text-lg">Log In</button>
                        <button onClick={onLogin} className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-center font-bold shadow-lg text-lg text-white">Start Building</button>
                    </div>
                </div>
            )}
        </nav>
    );

    const Footer = () => (
        <footer className="border-t border-white/5 bg-black/20 backdrop-blur-xl pt-16 pb-8 mt-20 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h4 className="font-bold text-white mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><button onClick={() => onNavigate(ViewState.FEATURES)} className="hover:text-primary transition-colors">Features</button></li>
                        <li><button onClick={() => onNavigate(ViewState.PRICING)} className="hover:text-primary transition-colors">Pricing</button></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Docs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                © 2024 FlowGen AI Inc. All rights reserved.
            </div>
        </footer>
    );

    const HomePage = () => {
        const testimonials = [
            { text: "The Gemini integration is absolutely seamless. Changed how I prototype.", author: "Sarah J., UX Designer", role: "Design Lead" },
            { text: "Nano Banana allows me to edit assets in milliseconds. Incredible speed.", author: "Mike T., Game Dev", role: "Indie Dev" },
            { text: "Finally a node editor that doesn't look like Windows 95. Beautiful UI.", author: "Elena R., Artist", role: "Concept Artist" },
            { text: "The reasoning capabilities of the Gemini node are next level.", author: "David K., Researcher", role: "AI Research" },
        ];

        return (
        <>
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Hero */}
            <header className="mt-10 md:mt-20 text-center max-w-5xl mx-auto px-4 md:px-6 relative mb-16 md:mb-24 z-10">
                {/* Spotlight Effect */}
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/20 via-transparent to-transparent rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium hover:bg-white/10 cursor-pointer transition-all hover:border-primary/50 hover:text-white group backdrop-blur-sm" onClick={() => onNavigate(ViewState.FEATURES)}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    <span className="group-hover:text-shadow transition-all">New: Nano Banana Model Support</span>
                    <svg className="w-3 h-3 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                    Visual AI Workflows for <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">Professional Creators</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Design complex image generation pipelines with a node-based editor. 
                    Integrate <span className="text-white font-semibold">Gemini 3</span> and <span className="text-white font-semibold">Nano Banana</span> models for real-time logic and editing.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
                    <button 
                        onClick={onLogin}
                        className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] border-t border-white/20"
                    >
                        Start Building Free
                    </button>
                    <button 
                        onClick={() => onNavigate(ViewState.FEATURES)}
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center gap-2 group"
                    >
                        Explore Features
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>

                {/* UI Mockup with Float Animation */}
                <div className="mt-16 md:mt-24 relative mx-auto max-w-6xl group animate-float">
                    {/* Glow Behind */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                    
                    <div className="relative rounded-xl bg-[#15151a] border border-white/10 overflow-hidden shadow-2xl ring-1 ring-white/10">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                        {/* Header Mock */}
                        <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                        </div>
                        <img 
                            src="https://picsum.photos/1200/650" 
                            alt="App Interface" 
                            className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        
                        {/* Floating Badge */}
                        <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3 shadow-xl animate-bounce delay-1000 duration-[3000ms]">
                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                            <span className="text-xs font-mono text-green-400">Generation Complete (0.4s)</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Trusted By */}
            <div className="border-y border-white/5 bg-white/[0.02] py-12 mb-20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-8 font-semibold">Powering Next-Gen Workflows</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        {['Acme Corp', 'Nebula AI', 'Quantum Studios', 'Vertex Labs', 'Future Flow'].map((name, i) => (
                            <div key={i} className="flex items-center gap-2 text-lg md:text-xl font-bold text-white cursor-default hover:text-primary transition-colors">
                                <div className="w-6 h-6 bg-current rounded-full opacity-50"></div> {name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Value Props - Bento Grid Style */}
            <section className="py-20 relative z-10">
                 <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for Performance</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Stop wrestling with scripts. Build visually with tools designed for speed and creativity.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="col-span-1 md:col-span-2 glass-panel p-8 rounded-3xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Node-Based Logic</h3>
                                <p className="text-gray-400 leading-relaxed max-w-md">Connect inputs, prompts, and models visually. Create reusable workflows in seconds with our intuitive drag-and-drop interface.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="glass-panel p-8 rounded-3xl relative group overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-secondary/20 to-transparent opacity-50"></div>
                            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-secondary group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Real-Time Gemini 3</h3>
                            <p className="text-gray-400">Leverage Google's most capable model for complex reasoning.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="glass-panel p-8 rounded-3xl relative group overflow-hidden">
                             <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>
                             <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Nano Banana Edits</h3>
                            <p className="text-gray-400">Ultra-fast image editing without heavy diffusion latency.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="col-span-1 md:col-span-2 glass-panel p-8 rounded-3xl relative group overflow-hidden flex items-center justify-between">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-3">Enterprise Ready</h3>
                                <p className="text-gray-400 max-w-sm">Team collaboration, version control, and API access included in the Pro plan.</p>
                            </div>
                            <div className="hidden md:block w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-full border border-white/10 shadow-2xl flex-shrink-0 relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-transparent opacity-20 animate-spin-slow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 overflow-hidden bg-black/20 border-y border-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Creators</h2>
                </div>
                
                <div className="relative w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
                    
                    <div className="flex w-max animate-scroll">
                        {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
                            <div key={i} className="w-[400px] flex-shrink-0 mx-4 p-8 glass-panel rounded-2xl hover:border-white/20 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="flex text-yellow-400 gap-1">
                                        {[1,2,3,4,5].map(star => (
                                            <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed text-lg">"{item.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center font-bold text-sm">{item.author.charAt(0)}</div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{item.author}</div>
                                        <div className="text-xs text-gray-500">{item.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
                 
                 <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                     <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Ready to build the future?</h2>
                     <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                         Join the community of creators pushing the boundaries of AI image generation.
                     </p>
                     <button 
                        onClick={onLogin}
                        className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.4)]"
                     >
                         Start Building Now
                     </button>
                 </div>
            </section>
        </>
        );
    };

    const FeaturesPage = () => (
        <div className="py-20 max-w-7xl mx-auto px-6 z-10 relative">
             <div className="text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">Limitless Potential</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Everything you need to build production-grade pipelines.
                </p>
            </div>

            <div className="space-y-32">
                {/* Feature 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Reasoning Engine
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Gemini 3 Pro Reasoning</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Go beyond simple prompts. Connect the Gemini 3 Pro node to analyze input images, extract semantic meaning, and chain reasoning steps before generating output.
                        </p>
                        <ul className="space-y-4">
                            {['Multimodal Analysis', 'Complex Reasoning Chains', 'Contextual Understanding'].map((item, i) => (
                                 <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                         <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                         <div className="glass-panel p-2 rounded-2xl relative">
                            <img src="https://picsum.photos/800/600?grayscale" className="rounded-xl w-full object-cover hover:scale-[1.02] transition-transform duration-500" alt="Gemini Feature" />
                         </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative group">
                         <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                         <div className="glass-panel p-2 rounded-2xl relative">
                            <img src="https://picsum.photos/800/600?blur" className="rounded-xl w-full object-cover hover:scale-[1.02] transition-transform duration-500" alt="Nano Feature" />
                         </div>
                    </div>
                    <div className="order-1 md:order-2">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> Flash Generation
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Nano Banana Speed</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Lightning fast edits for real-time workflows. The Nano node is optimized for specific image-to-image transformations with minimal latency.
                        </p>
                         <ul className="space-y-4">
                            {['Sub-second latency', 'Edge-optimized', 'High fidelity preservation'].map((item, i) => (
                                 <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    const PricingPage = () => (
        <div className="py-20 max-w-7xl mx-auto px-6 z-10 relative">
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Transparent Pricing</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Start for free, upgrade as you scale.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Tier */}
                <div className="glass-panel rounded-3xl p-8 flex flex-col hover:bg-white/5 transition-colors">
                    <div className="mb-4">
                        <span className="text-sm font-bold tracking-wider text-gray-400 uppercase bg-white/5 px-2 py-1 rounded">Starter</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-5xl font-bold">$0</span>
                        <span className="text-gray-500 text-lg">/mo</span>
                    </div>
                    <p className="text-gray-400 mb-8 h-12">Perfect for hobbyists experimenting with AI workflows.</p>
                    <button onClick={onLogin} className="w-full py-4 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-colors mb-8">
                        Start Free
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Unlimited Nano Nodes', 'Standard Speed', '3 Active Workflows'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pro Tier - Animated Border */}
                <div className="relative group transform md:-translate-y-4">
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-secondary to-primary rounded-[26px] blur-sm opacity-75 animate-gradient-x"></div>
                    <div className="relative bg-[#15151a] rounded-3xl p-8 h-full flex flex-col shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max text-white shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-4 mt-2">
                            <span className="text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 px-2 py-1 rounded">Pro Creator</span>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">$29</span>
                            <span className="text-gray-500 text-lg">/mo</span>
                        </div>
                        <p className="text-gray-400 mb-8 h-12">For professionals needing Gemini 3 power.</p>
                        <button onClick={onLogin} className="w-full py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 rounded-xl font-bold transition-all mb-8">
                            Get Pro
                        </button>
                        <ul className="space-y-4 flex-1">
                            {['Everything in Starter', 'Gemini 3 Pro Nodes', 'Priority Processing', 'Unlimited Workflows', '4K Export'].map((item,i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white">
                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Enterprise Tier */}
                <div className="glass-panel rounded-3xl p-8 flex flex-col hover:bg-white/5 transition-colors">
                    <div className="mb-4">
                        <span className="text-sm font-bold tracking-wider text-gray-400 uppercase bg-white/5 px-2 py-1 rounded">Team</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-5xl font-bold">$99</span>
                        <span className="text-gray-500 text-lg">/mo</span>
                    </div>
                    <p className="text-gray-400 mb-8 h-12">For agencies building collaborative pipelines.</p>
                    <button className="w-full py-4 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-colors mb-8">
                        Contact Sales
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Everything in Pro', 'Collaboration', 'API Access', 'Dedicated Support'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-white overflow-y-auto font-sans relative selection:bg-primary/30">
            <AnimatedBackground />
            <Navbar />
            <main>
                {currentView === ViewState.LANDING && <HomePage />}
                {currentView === ViewState.FEATURES && <FeaturesPage />}
                {currentView === ViewState.PRICING && <PricingPage />}
            </main>
            <Footer />
        </div>
    );
};
