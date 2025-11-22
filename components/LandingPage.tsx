
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
                <button onClick={() => onNavigate(ViewState.RESOURCES)} className={`hover:text-white transition-colors relative group ${currentView === ViewState.RESOURCES ? 'text-white' : ''}`}>
                    Resources
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full ${currentView === ViewState.RESOURCES ? 'w-full' : ''}`}></span>
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
                    <button onClick={() => { onNavigate(ViewState.RESOURCES); setIsMobileMenuOpen(false); }} className="text-2xl font-medium text-gray-300 hover:text-white">Resources</button>
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
                        <li><button onClick={() => onNavigate(ViewState.CHANGELOG)} className="hover:text-primary transition-colors">Changelog</button></li>
                        <li><button onClick={() => onNavigate(ViewState.DOCS)} className="hover:text-primary transition-colors">Docs</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><button onClick={() => onNavigate(ViewState.COMMUNITY)} className="hover:text-primary transition-colors">Community</button></li>
                        <li><button onClick={() => onNavigate(ViewState.HELP_CENTER)} className="hover:text-primary transition-colors">Help Center</button></li>
                        <li><button onClick={() => onNavigate(ViewState.TUTORIALS)} className="hover:text-primary transition-colors">Tutorials</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><button onClick={() => onNavigate(ViewState.ABOUT)} className="hover:text-primary transition-colors">About</button></li>
                        <li><button onClick={() => onNavigate(ViewState.BLOG)} className="hover:text-primary transition-colors">Blog</button></li>
                        <li><button onClick={() => onNavigate(ViewState.CAREERS)} className="hover:text-primary transition-colors">Careers</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><button onClick={() => onNavigate(ViewState.PRIVACY)} className="hover:text-primary transition-colors">Privacy</button></li>
                        <li><button onClick={() => onNavigate(ViewState.TERMS)} className="hover:text-primary transition-colors">Terms</button></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
                © 2024 FlowGen AI Inc. All rights reserved.
            </div>
        </footer>
    );

    // --- Generic Layouts for Simple Text Pages ---
    // Fix: Make children optional to resolve TS error when used with explicit props
    const TextPageLayout = ({ title, lastUpdated, children }: { title: string, lastUpdated?: string, children?: React.ReactNode }) => (
        <div className="py-20 max-w-4xl mx-auto px-6 z-10 relative min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                {lastUpdated && <p className="text-gray-400">Last updated: {lastUpdated}</p>}
            </div>
            <div className="glass-panel p-8 md:p-12 rounded-3xl text-gray-300 leading-relaxed space-y-6">
                {children}
            </div>
        </div>
    );

    // --- Specific Page Components ---
    
    const ChangelogPage = () => (
        <div className="py-20 max-w-3xl mx-auto px-6 z-10 relative min-h-screen">
            <h1 className="text-4xl font-bold mb-12 text-center">Changelog</h1>
            <div className="relative border-l border-white/10 pl-8 space-y-12">
                {[
                    { ver: "v2.0.0", date: "Oct 26, 2023", title: "Nano Banana Release", desc: "Introduced Gemini 2.5 Flash Image model for sub-second generation speeds." },
                    { ver: "v1.5.0", date: "Sep 15, 2023", title: "Gemini 3 Pro Integration", desc: "Added advanced reasoning nodes capable of complex prompt analysis." },
                    { ver: "v1.0.0", date: "Aug 01, 2023", title: "Initial Launch", desc: "Public beta release of FlowGen AI with basic node editor." }
                ].map((log, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[39px] top-1 w-5 h-5 bg-primary rounded-full border-4 border-background"></div>
                        <div className="text-xs text-primary font-bold mb-1">{log.date}</div>
                        <h2 className="text-2xl font-bold mb-2">{log.title} <span className="text-sm text-gray-500 font-normal ml-2">{log.ver}</span></h2>
                        <p className="text-gray-400 glass-panel p-4 rounded-xl inline-block">{log.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const DocsPage = () => (
        <div className="pt-20 max-w-7xl mx-auto px-6 z-10 relative min-h-screen flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-8">
                    <div>
                        <h3 className="font-bold text-white mb-3">Getting Started</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="text-primary font-medium cursor-pointer">Introduction</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Installation</li>
                            <li className="hover:text-white cursor-pointer transition-colors">First Workflow</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-3">Core Concepts</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="hover:text-white cursor-pointer transition-colors">Nodes & Edges</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Prompt Engineering</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Gemini Models</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="glass-panel p-8 md:p-12 rounded-3xl mb-8">
                    <h1 className="text-4xl font-bold mb-6">Introduction to FlowGen AI</h1>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        FlowGen AI is a node-based interface for building complex AI image generation pipelines. By visualizing the flow of data between models, prompt templates, and editing tools, you can create reproducible and sophisticated workflows.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5 font-mono text-sm text-green-400 mb-6">
                        npm install flowgen-sdk
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Key Concepts</h2>
                    <p className="text-gray-300 mb-4">
                        At the heart of FlowGen is the **Node**. Nodes represent distinct operations—generating text, processing images, or applying logic.
                    </p>
                </div>
            </div>
        </div>
    );

    const CommunityPage = () => (
        <div className="py-20 max-w-7xl mx-auto px-6 z-10 relative min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Join the Community</h1>
                <p className="text-xl text-gray-400">Connect with 50,000+ creators building the future.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="glass-panel p-8 rounded-3xl text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.942 5.556a16.299 16.299 0 00-4.126-1.297c-.178.321-.386.754-.529 1.097a15.175 15.175 0 00-4.573 0 11.583 11.583 0 00-.535-1.097 16.274 16.274 0 00-4.129 1.3 17.17 17.17 0 00-6.933 11.992c1.177 1.157 2.792 1.867 4.392 1.867.357-.005.71-.054 1.054-.147 1.503-.403 2.868-1.138 4.045-2.126-1.436-.37-2.807-.927-4.06-1.655a.75.75 0 11.762-1.29c3.56 2.073 7.88 2.073 11.44 0a.75.75 0 01.762 1.29 11.41 11.41 0 01-4.062 1.657c1.176.988 2.54 1.722 4.044 2.124.344.093.697.142 1.053.147 1.601 0 3.216-.71 4.394-1.867a17.212 17.212 0 00-6.935-11.994zM8.15 14.248c-.933 0-1.697-.848-1.697-1.886 0-1.038.753-1.886 1.697-1.886.954 0 1.71.857 1.697 1.886 0 1.038-.744 1.886-1.697 1.886zm7.7 0c-.933 0-1.697-.848-1.697-1.886 0-1.038.754-1.886 1.697-1.886.954 0 1.71.857 1.697 1.886 0 1.038-.743 1.886-1.697 1.886z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Discord</h3>
                    <p className="text-sm text-gray-400">Chat with devs and share art.</p>
                </div>
                <div className="glass-panel p-8 rounded-3xl text-center hover:border-blue-400/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Twitter / X</h3>
                    <p className="text-sm text-gray-400">Follow for latest updates.</p>
                </div>
                <div className="glass-panel p-8 rounded-3xl text-center hover:border-pink-500/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-400">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Showcase</h3>
                    <p className="text-sm text-gray-400">See what others are building.</p>
                </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-8">Community Showcase</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[1,2,3,4,5,6,7,8].map(i => (
                     <div key={i} className="aspect-square rounded-xl overflow-hidden relative group">
                         <img src={`https://picsum.photos/400/400?random=${i + 20}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Community Art" />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                             <span className="text-white font-bold text-sm">@User{i}</span>
                         </div>
                     </div>
                 ))}
            </div>
        </div>
    );

    const HelpCenterPage = () => (
        <div className="py-20 max-w-4xl mx-auto px-6 z-10 relative min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">How can we help?</h1>
                <div className="relative max-w-xl mx-auto">
                     <input 
                        type="text" 
                        placeholder="Search for answers..." 
                        className="w-full py-4 px-6 rounded-full bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary outline-none text-white placeholder-gray-400"
                     />
                     <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Account & Billing", items: ["Managing subscription", "Updating payment method", "Cancel account"] },
                    { title: "Editor Basics", items: ["Connecting nodes", "Importing images", "Using templates"] },
                    { title: "Advanced Features", items: ["Gemini 3 Pro Config", "API Access", "Team permissions"] },
                    { title: "Troubleshooting", items: ["Connection errors", "Export failed", "Browser support"] }
                ].map((cat, i) => (
                    <div key={i} className="glass-panel p-8 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                        <ul className="space-y-3">
                            {cat.items.map((item, j) => (
                                <li key={j} className="text-gray-400 hover:text-primary cursor-pointer flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
    
    const TutorialsPage = () => (
        <div className="py-20 max-w-6xl mx-auto px-6 z-10 relative min-h-screen">
            <h1 className="text-4xl font-bold mb-12 text-center">Video Tutorials</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "FlowGen 101: The Basics", time: "5:30", thumb: "https://picsum.photos/600/340?random=1" },
                    { title: "Mastering Nano Edits", time: "8:15", thumb: "https://picsum.photos/600/340?random=2" },
                    { title: "Advanced Reasoning Chains", time: "12:45", thumb: "https://picsum.photos/600/340?random=3" },
                    { title: "Style Consistency Guide", time: "6:20", thumb: "https://picsum.photos/600/340?random=4" },
                    { title: "Building a Comic Generator", time: "15:00", thumb: "https://picsum.photos/600/340?random=5" },
                    { title: "Exporting for Print", time: "4:10", thumb: "https://picsum.photos/600/340?random=6" }
                ].map((vid, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="relative rounded-xl overflow-hidden mb-4">
                            <img src={vid.thumb} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" alt={vid.title} />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-bold">{vid.time}</div>
                        </div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{vid.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

    const AboutPage = () => (
        <div className="py-20 max-w-4xl mx-auto px-6 z-10 relative min-h-screen">
             <div className="text-center mb-20">
                <h1 className="text-5xl font-bold mb-6">We Are FlowGen AI</h1>
                <p className="text-xl text-gray-400">Democratizing complex AI workflows for professional creators.</p>
            </div>
            <div className="glass-panel p-8 md:p-12 rounded-3xl mb-12 text-lg text-gray-300 leading-relaxed">
                <p className="mb-6">
                    Founded in 2022, FlowGen AI started with a simple premise: AI tools are powerful, but chaining them together is too hard. We set out to build a visual interface that treats AI models like Lego blocks—interchangeable, connectable, and infinitely creative.
                </p>
                <p>
                    Today, we serve over 50,000 designers, game developers, and researchers who rely on our node-based editor to prototype rapidly and deploy production-grade assets.
                </p>
            </div>
            
            <h2 className="text-3xl font-bold mb-8 text-center">The Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Alex Chen', 'Sarah Miller', 'David Kim', 'Jessica Wong'].map((name, i) => (
                    <div key={i} className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
                            <img src={`https://picsum.photos/200/200?random=${i + 50}`} alt={name} />
                        </div>
                        <h3 className="font-bold">{name}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Co-Founder</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
    const BlogPage = () => (
        <div className="py-20 max-w-6xl mx-auto px-6 z-10 relative min-h-screen">
            <h1 className="text-4xl md:text-6xl font-bold mb-16 text-center">FlowGen Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "The Future of Node-Based AI", date: "Oct 28, 2023", tag: "Opinion" },
                    { title: "Optimizing Gemini 3 Pro Costs", date: "Oct 25, 2023", tag: "Engineering" },
                    { title: "Community Spotlight: Oct", date: "Oct 20, 2023", tag: "Community" },
                    { title: "Introducing Nano Banana", date: "Oct 15, 2023", tag: "Product" },
                    { title: "5 Workflows for Game Devs", date: "Oct 10, 2023", tag: "Tutorial" },
                    { title: "FlowGen raises Series A", date: "Oct 01, 2023", tag: "Company" }
                ].map((post, i) => (
                    <div key={i} className="glass-panel rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
                        <div className="h-48 bg-gray-800 overflow-hidden">
                            <img src={`https://picsum.photos/600/400?random=${i + 60}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase text-primary tracking-wider">{post.tag}</span>
                                <span className="text-xs text-gray-500">{post.date}</span>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const CareersPage = () => (
        <div className="py-20 max-w-4xl mx-auto px-6 z-10 relative min-h-screen">
             <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
                <p className="text-xl text-gray-400">Help us build the operating system for creative AI.</p>
            </div>
            
            <div className="space-y-4">
                {[
                    { role: "Senior Frontend Engineer", loc: "Remote / SF", type: "Engineering" },
                    { role: "AI Research Scientist", loc: "London, UK", type: "Research" },
                    { role: "Product Designer", loc: "New York, NY", type: "Design" },
                    { role: "Developer Advocate", loc: "Remote", type: "Community" }
                ].map((job, i) => (
                    <div key={i} className="glass-panel p-6 rounded-xl flex items-center justify-between group hover:bg-white/10 cursor-pointer transition-colors">
                        <div>
                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{job.role}</h3>
                            <p className="text-sm text-gray-400">{job.loc} • {job.type}</p>
                        </div>
                        <svg className="w-6 h-6 text-gray-500 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                ))}
            </div>
        </div>
    );

    const TermsPage = () => (
        <TextPageLayout title="Terms of Service" lastUpdated="October 1, 2023">
            <h3 className="text-xl font-bold text-white">1. Acceptance of Terms</h3>
            <p>By accessing and using FlowGen AI, you accept and agree to be bound by the terms and provision of this agreement.</p>
            <h3 className="text-xl font-bold text-white">2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on FlowGen AI's website for personal, non-commercial transitory viewing only.</p>
            <h3 className="text-xl font-bold text-white">3. AI Generated Content</h3>
            <p>You retain ownership of all content generated using our platform, subject to the terms of the underlying AI models (Google Gemini).</p>
        </TextPageLayout>
    );

    const PrivacyPage = () => (
        <TextPageLayout title="Privacy Policy" lastUpdated="October 1, 2023">
            <h3 className="text-xl font-bold text-white">Data Collection</h3>
            <p>We collect information you provide directly to us, such as when you create an account, subscribe, or contact customer support.</p>
            <h3 className="text-xl font-bold text-white">AI Processing</h3>
            <p>Images and prompts uploaded to the service are processed by Google Gemini APIs. We do not use your private data to train our open models without explicit consent.</p>
            <h3 className="text-xl font-bold text-white">Cookies</h3>
            <p>We use cookies to improve your experience and analyze traffic.</p>
        </TextPageLayout>
    );

    // --- Main Render Switch ---
    
    // Helper for Main Home Views
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
                            <div key={i} className="w-[300px] md:w-[400px] flex-shrink-0 mx-4 p-6 md:p-8 glass-panel rounded-2xl hover:border-white/20 transition-colors">
                                <div className="flex items-center mb-6">
                                    <div className="flex text-yellow-400 gap-1">
                                        {[1,2,3,4,5].map(star => (
                                            <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">"{item.text}"</p>
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
                     <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to build the future?</h2>
                     <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                         Join the community of creators pushing the boundaries of AI image generation.
                     </p>
                     <button 
                        onClick={onLogin}
                        className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.4)] w-full md:w-auto"
                     >
                         Start Building Now
                     </button>
                 </div>
            </section>
        </>
        );
    };
    
    const FeaturesPage = () => (
        <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-6 z-10 relative min-h-screen">
             <div className="text-center mb-16 md:mb-24">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 pb-2">Limitless Potential</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    Everything you need to build production-grade pipelines.
                </p>
            </div>

            <div className="space-y-20 md:space-y-32">
                {/* Feature 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Reasoning Engine
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Gemini 3 Pro Reasoning</h2>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                            Go beyond simple prompts. Connect the Gemini 3 Pro node to analyze input images, extract semantic meaning, and chain reasoning steps before generating output.
                        </p>
                        <ul className="space-y-4">
                            {['Multimodal Analysis', 'Complex Reasoning Chains', 'Contextual Understanding'].map((item, i) => (
                                 <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-1 md:order-2 relative group">
                         <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                         <div className="glass-panel p-2 rounded-2xl relative">
                            <img src="https://picsum.photos/800/600?grayscale" className="rounded-xl w-full object-cover hover:scale-[1.02] transition-transform duration-500 shadow-2xl" alt="Gemini Feature" />
                         </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    <div className="order-1 relative group">
                         <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                         <div className="glass-panel p-2 rounded-2xl relative">
                            <img src="https://picsum.photos/800/600?blur" className="rounded-xl w-full object-cover hover:scale-[1.02] transition-transform duration-500 shadow-2xl" alt="Nano Feature" />
                         </div>
                    </div>
                    <div className="order-2">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> Flash Generation
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Nano Banana Speed</h2>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                            Lightning fast edits for real-time workflows. The Nano node is optimized for specific image-to-image transformations with minimal latency.
                        </p>
                         <ul className="space-y-4">
                            {['Sub-second latency', 'Edge-optimized', 'High fidelity preservation'].map((item, i) => (
                                 <li key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
                    <div className="glass-panel p-6 rounded-2xl text-center md:text-left">
                         <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0 text-teal-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                         </div>
                         <h3 className="text-xl font-bold mb-2">Template System</h3>
                         <p className="text-gray-400 text-sm">Reuse prompts across multiple workflows. Build a library of styles.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl text-center md:text-left">
                         <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0 text-indigo-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                         </div>
                         <h3 className="text-xl font-bold mb-2">Modular UI</h3>
                         <p className="text-gray-400 text-sm">Drag, drop, and connect nodes on an infinite canvas designed for complexity.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl text-center md:text-left">
                         <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 mx-auto md:mx-0 text-pink-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         </div>
                         <h3 className="text-xl font-bold mb-2">Production Ready</h3>
                         <p className="text-gray-400 text-sm">Export high-resolution images suitable for final delivery.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const PricingPage = () => (
        <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-6 z-10 relative min-h-screen">
            <div className="text-center mb-16 md:mb-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Transparent Pricing</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    Start for free, upgrade as you scale. No hidden fees.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Tier */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col hover:bg-white/5 transition-colors order-2 md:order-1">
                    <div className="mb-4">
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-400 uppercase bg-white/5 px-2 py-1 rounded">Starter</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl md:text-5xl font-bold">$0</span>
                        <span className="text-gray-500 text-lg">/mo</span>
                    </div>
                    <p className="text-gray-400 mb-8 h-auto md:h-12 text-sm md:text-base">Perfect for hobbyists experimenting with AI workflows.</p>
                    <button onClick={onLogin} className="w-full py-3 md:py-4 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-colors mb-8">
                        Start Free
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Unlimited Nano Nodes', 'Standard Speed', '3 Active Workflows'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pro Tier - Animated Border */}
                <div className="relative group order-1 md:order-2 transform md:-translate-y-4 z-10">
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-secondary to-primary rounded-[26px] blur-sm opacity-75 animate-gradient-x"></div>
                    <div className="relative bg-[#15151a] rounded-3xl p-6 md:p-8 h-full flex flex-col shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max text-white shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-4 mt-2">
                            <span className="text-xs md:text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 px-2 py-1 rounded">Pro Creator</span>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">$29</span>
                            <span className="text-gray-500 text-lg">/mo</span>
                        </div>
                        <p className="text-gray-400 mb-8 h-auto md:h-12 text-sm md:text-base">For professionals needing Gemini 3 power.</p>
                        <button onClick={onLogin} className="w-full py-3 md:py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 rounded-xl font-bold transition-all mb-8">
                            Get Pro
                        </button>
                        <ul className="space-y-4 flex-1">
                            {['Everything in Starter', 'Gemini 3 Pro Nodes', 'Priority Processing', 'Unlimited Workflows', '4K Export'].map((item,i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white">
                                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Enterprise Tier */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col hover:bg-white/5 transition-colors order-3">
                    <div className="mb-4">
                        <span className="text-xs md:text-sm font-bold tracking-wider text-gray-400 uppercase bg-white/5 px-2 py-1 rounded">Team</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl md:text-5xl font-bold">$99</span>
                        <span className="text-gray-500 text-lg">/mo</span>
                    </div>
                    <p className="text-gray-400 mb-8 h-auto md:h-12 text-sm md:text-base">For agencies building collaborative pipelines.</p>
                    <button className="w-full py-3 md:py-4 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition-colors mb-8">
                        Contact Sales
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Everything in Pro', 'Collaboration', 'API Access', 'Dedicated Support'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* FAQ Preview */}
            <div className="mt-32 max-w-3xl mx-auto">
                 <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                 <div className="space-y-6">
                     {[
                         {q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You will retain access until the end of your billing period."},
                         {q: "What happens if I exceed my node limit?", a: "On the free plan, you will be prompted to upgrade. Pro plans have unlimited node usage."},
                         {q: "Is Gemini 3 included?", a: "Yes, Gemini 3 Pro reasoning nodes are included in the Pro and Enterprise plans with generous usage limits."}
                     ].map((faq, i) => (
                         <div key={i} className="glass-panel p-6 rounded-xl">
                             <h3 className="font-bold text-lg mb-2 text-white">{faq.q}</h3>
                             <p className="text-gray-400">{faq.a}</p>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
    
    const ResourcesPage = () => (
         <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-6 z-10 relative min-h-screen">
            <div className="text-center mb-16 md:mb-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Resources & Docs</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    Master FlowGen AI with guides, tutorials, and API documentation.
                </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-md transition-all"
                    placeholder="Search documentation, guides, and tutorials..."
                />
            </div>
            
            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group" onClick={() => onNavigate(ViewState.DOCS)}>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Documentation</h3>
                    <p className="text-gray-400 mb-4">Detailed API references and node configuration guides.</p>
                    <span className="text-primary font-medium flex items-center gap-2">Read Docs <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                </div>
                
                <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group" onClick={() => onNavigate(ViewState.TUTORIALS)}>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Video Tutorials</h3>
                    <p className="text-gray-400 mb-4">Step-by-step walkthroughs of common workflows.</p>
                     <span className="text-primary font-medium flex items-center gap-2">Watch Now <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                </div>
                
                <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group" onClick={() => onNavigate(ViewState.COMMUNITY)}>
                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Community</h3>
                    <p className="text-gray-400 mb-4">Join Discord, share templates, and get help.</p>
                     <span className="text-primary font-medium flex items-center gap-2">Join Chat <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                </div>
            </div>
            
            {/* Latest Articles */}
            <h2 className="text-2xl font-bold mb-8">Latest from the Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass-panel rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => onNavigate(ViewState.BLOG)}>
                     <div className="h-48 bg-gray-800 overflow-hidden relative">
                         <img src="https://picsum.photos/800/400?random=1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Blog 1" />
                         <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase">Tutorial</div>
                     </div>
                     <div className="p-6">
                         <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Building a Character Generator with Nano Banana</h3>
                         <p className="text-gray-400 text-sm mb-4">Learn how to chain image inputs for consistent character style.</p>
                         <div className="flex items-center justify-between text-xs text-gray-500">
                             <span>Oct 24, 2023</span>
                             <span>5 min read</span>
                         </div>
                     </div>
                 </div>
                 <div className="glass-panel rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer" onClick={() => onNavigate(ViewState.BLOG)}>
                     <div className="h-48 bg-gray-800 overflow-hidden relative">
                         <img src="https://picsum.photos/800/400?random=2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Blog 2" />
                         <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase">Update</div>
                     </div>
                     <div className="p-6">
                         <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Gemini 3 Pro: The Reasoning Engine</h3>
                         <p className="text-gray-400 text-sm mb-4">Deep dive into how Gemini 3 handles complex prompt analysis.</p>
                         <div className="flex items-center justify-between text-xs text-gray-500">
                             <span>Oct 20, 2023</span>
                             <span>8 min read</span>
                         </div>
                     </div>
                 </div>
            </div>
         </div>
    );

    return (
        <div className="min-h-screen bg-background text-white overflow-y-auto font-sans relative selection:bg-primary/30">
            <AnimatedBackground />
            <Navbar />
            <main className="flex-1">
                {currentView === ViewState.LANDING && <HomePage />}
                {currentView === ViewState.FEATURES && <FeaturesPage />}
                {currentView === ViewState.PRICING && <PricingPage />}
                {currentView === ViewState.RESOURCES && <ResourcesPage />}
                {currentView === ViewState.CHANGELOG && <ChangelogPage />}
                {currentView === ViewState.DOCS && <DocsPage />}
                {currentView === ViewState.COMMUNITY && <CommunityPage />}
                {currentView === ViewState.HELP_CENTER && <HelpCenterPage />}
                {currentView === ViewState.TUTORIALS && <TutorialsPage />}
                {currentView === ViewState.ABOUT && <AboutPage />}
                {currentView === ViewState.BLOG && <BlogPage />}
                {currentView === ViewState.CAREERS && <CareersPage />}
                {currentView === ViewState.TERMS && <TermsPage />}
                {currentView === ViewState.PRIVACY && <PrivacyPage />}
            </main>
            <Footer />
        </div>
    );
};
