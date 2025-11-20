
import React from 'react';
import { ViewState } from '../types';

interface LandingPageProps {
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
    onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ currentView, onNavigate, onLogin }) => {
    
    const Navbar = () => (
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
            <div 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={() => onNavigate(ViewState.LANDING)}
            >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-[0_0_15px_-3px_rgba(99,102,241,0.6)]"></div>
                <span className="font-bold text-xl tracking-tight text-white">FlowGen AI</span>
            </div>
            <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-300">
                <button onClick={() => onNavigate(ViewState.FEATURES)} className={`hover:text-white transition-colors ${currentView === ViewState.FEATURES ? 'text-white' : ''}`}>Features</button>
                <button onClick={() => onNavigate(ViewState.PRICING)} className={`hover:text-white transition-colors ${currentView === ViewState.PRICING ? 'text-white' : ''}`}>Pricing</button>
                <button onClick={() => onNavigate(ViewState.LANDING)} className="hover:text-white transition-colors">Resources</button>
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={onLogin}
                    className="px-5 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all text-sm font-medium"
                >
                    Log In
                </button>
                <button 
                     onClick={onLogin}
                    className="px-5 py-2 bg-primary hover:bg-indigo-500 text-white rounded-full transition-all shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] text-sm font-medium"
                >
                    Start Building
                </button>
            </div>
        </nav>
    );

    const Footer = () => (
        <footer className="border-t border-white/10 bg-surface/50 pt-16 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h4 className="font-bold text-white mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><button onClick={() => onNavigate(ViewState.FEATURES)} className="hover:text-primary">Features</button></li>
                        <li><button onClick={() => onNavigate(ViewState.PRICING)} className="hover:text-primary">Pricing</button></li>
                        <li><a href="#" className="hover:text-primary">Changelog</a></li>
                        <li><a href="#" className="hover:text-primary">Docs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">Community</a></li>
                        <li><a href="#" className="hover:text-primary">Help Center</a></li>
                        <li><a href="#" className="hover:text-primary">API Status</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">About</a></li>
                        <li><a href="#" className="hover:text-primary">Blog</a></li>
                        <li><a href="#" className="hover:text-primary">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">Privacy</a></li>
                        <li><a href="#" className="hover:text-primary">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                © 2024 FlowGen AI Inc. All rights reserved.
            </div>
        </footer>
    );

    const HomePage = () => (
        <>
            {/* Hero */}
            <header className="mt-20 text-center max-w-4xl mx-auto px-6 relative mb-24">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10"></div>
                <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wider uppercase hover:bg-secondary/20 cursor-pointer transition-colors" onClick={() => onNavigate(ViewState.FEATURES)}>
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                    New: Nano Banana Model Support
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Visual AI Workflows for <br/> Professional Creators
                </h1>
                <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                    Design complex image generation pipelines with a node-based editor. 
                    Integrate Gemini 3 and Nano Banana models for real-time logic and editing.
                </p>
                <div className="flex justify-center gap-4">
                    <button 
                        onClick={onLogin}
                        className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)]"
                    >
                        Start Building Free
                    </button>
                    <button 
                        onClick={() => onNavigate(ViewState.FEATURES)}
                        className="px-8 py-4 bg-surface border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-colors"
                    >
                        Explore Features
                    </button>
                </div>

                {/* UI Mockup */}
                <div className="mt-20 relative mx-auto max-w-5xl group cursor-pointer" onClick={onLogin}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative rounded-xl bg-surface border border-border overflow-hidden shadow-2xl">
                        <img 
                            src="https://picsum.photos/1200/600" 
                            alt="App Interface" 
                            className="w-full h-auto opacity-90"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white font-medium">
                                Click to Try Live Demo
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Value Props */}
            <section className="py-20 bg-surface/30 border-y border-white/5">
                 <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why FlowGen AI?</h2>
                        <p className="text-gray-400">Built for performance, scalability, and creativity.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Node-Based Logic",
                                desc: "Connect inputs, prompts, and models visually. Create reusable workflows in seconds.",
                                icon: "M13 10V3L4 14h7v7l9-11h-7z"
                            },
                            {
                                title: "Real-Time Gemini 3",
                                desc: "Leverage Google's most capable model for complex reasoning and multimodal understanding.",
                                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            },
                            {
                                title: "Nano Banana Edits",
                                desc: "Use the lightweight, ultra-fast Nano Banana model for rapid image editing tasks.",
                                icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 bg-surface rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );

    const FeaturesPage = () => (
        <div className="py-20 max-w-7xl mx-auto px-6">
             <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Powerful Nodes. Limitless Potential.</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Everything you need to build production-grade AI image generation pipelines.
                </p>
            </div>

            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                <div>
                    <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Gemini 3 Pro Reasoning</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        Go beyond simple prompts. Connect the Gemini 3 Pro node to analyze input images, extract semantic meaning, and chain reasoning steps before generating output.
                    </p>
                    <ul className="space-y-3">
                        {['Multimodal Analysis', 'Complex Reasoning Chains', 'Contextual Understanding'].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 shadow-2xl relative">
                     <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-20"></div>
                     <img src="https://picsum.photos/600/400?grayscale" className="rounded w-full relative z-10" alt="Gemini Feature" />
                </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                <div className="order-2 md:order-1 bg-surface border border-border rounded-xl p-4 shadow-2xl relative">
                     <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-pink-600 rounded-xl blur-lg opacity-20"></div>
                     <img src="https://picsum.photos/600/400?blur" className="rounded w-full relative z-10" alt="Nano Feature" />
                </div>
                <div className="order-1 md:order-2">
                    <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Nano Banana Speed</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        Lightning fast edits for real-time workflows. The Nano node is optimized for specific image-to-image transformations with minimal latency.
                    </p>
                     <ul className="space-y-3">
                        {['Sub-second latency', 'Edge-optimized', 'High fidelity preservation'].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

             <div className="text-center bg-gradient-to-b from-surface to-background border border-white/5 rounded-2xl p-12">
                <h3 className="text-2xl font-bold mb-4">Ready to build your pipeline?</h3>
                <button onClick={onLogin} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                    Get Started Now
                </button>
             </div>
        </div>
    );

    const PricingPage = () => (
        <div className="py-20 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Start for free, upgrade as you scale. No hidden fees.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Free Tier */}
                <div className="bg-surface rounded-2xl p-8 border border-white/5 flex flex-col">
                    <div className="mb-4">
                        <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">Starter</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-400 mb-8">Perfect for hobbyists and experimenting with node workflows.</p>
                    <button onClick={onLogin} className="w-full py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition-colors mb-8">
                        Start Free
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Unlimited Nano Nodes', 'Standard Generation Speed', '3 Active Workflows', 'Community Support'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pro Tier */}
                <div className="bg-surface/50 rounded-2xl p-8 border border-primary/50 relative flex flex-col shadow-2xl transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Most Popular
                    </div>
                    <div className="mb-4 mt-2">
                        <span className="text-sm font-bold tracking-wider text-primary uppercase">Pro Creator</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">$29</span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-400 mb-8">For professionals needing power and Gemini 3 integration.</p>
                    <button onClick={onLogin} className="w-full py-3 bg-primary hover:bg-indigo-500 rounded-lg font-semibold transition-colors mb-8 shadow-lg">
                        Get Pro
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Everything in Starter', 'Access to Gemini 3 Pro Nodes', 'Priority Processing', 'Unlimited Workflows', '4K Image Export'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-white">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Enterprise Tier */}
                <div className="bg-surface rounded-2xl p-8 border border-white/5 flex flex-col">
                    <div className="mb-4">
                        <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">Team</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">$99</span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-400 mb-8">For agencies and teams building collaborative pipelines.</p>
                    <button className="w-full py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition-colors mb-8">
                        Contact Sales
                    </button>
                    <ul className="space-y-4 flex-1">
                        {['Everything in Pro', 'Collaborative Editing', 'Shared Asset Library', 'API Access', 'Dedicated Support'].map((item,i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-white overflow-y-auto font-sans">
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
