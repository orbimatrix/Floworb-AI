
import React, { useState, useCallback, useEffect } from 'react';
import { NodeCanvas } from './components/NodeGraph/NodeCanvas';
import { LandingPage } from './components/LandingPage';
import { NodeType, Node, Connection, ViewState, WorkflowState } from './types';
import { GeminiService } from './services/geminiService';

// Default Initial Workflow
const INITIAL_NODES: Node[] = [
  { 
    id: 'node-1', 
    type: NodeType.INPUT_IMAGE, 
    position: { x: 50, y: 150 }, 
    data: {}, 
    label: 'Source Image' 
  },
  { 
    id: 'node-2', 
    type: NodeType.NANO_EDIT, 
    position: { x: 400, y: 100 }, 
    data: { prompt: 'Make it look like a cyberpunk city' }, 
    label: 'Nano Editor' 
  },
  { 
    id: 'node-3', 
    type: NodeType.OUTPUT_PREVIEW, 
    position: { x: 800, y: 150 }, 
    data: {}, 
    label: 'Final Result' 
  }
];

const INITIAL_CONNECTIONS: Connection[] = [
  { id: 'c1', sourceId: 'node-1', targetId: 'node-2' },
  { id: 'c2', sourceId: 'node-2', targetId: 'node-3' }
];

// Mock Data for Saved Creations
const MOCK_SAVED_CREATIONS = [
  {
    id: 'save-1',
    name: 'Neon Cityscape Workflow',
    date: '2023-10-24',
    thumbnail: 'https://picsum.photos/id/10/400/300',
    nodesCount: 4
  },
  {
    id: 'save-2',
    name: 'Product Enhancer v2',
    date: '2023-10-22',
    thumbnail: 'https://picsum.photos/id/20/400/300',
    nodesCount: 6
  },
  {
    id: 'save-3',
    name: 'Portrait Retouching',
    date: '2023-10-20',
    thumbnail: 'https://picsum.photos/id/64/400/300',
    nodesCount: 3
  }
];

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [notification, setNotification] = useState<{msg: string, type: 'error' | 'info' | 'success'} | null>(null);
  const [savedWorkflows, setSavedWorkflows] = useState(MOCK_SAVED_CREATIONS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Auth Simulation ---
  const handleLogin = () => {
    setView(ViewState.AUTH);
    // Simulate API delay
    setTimeout(() => {
      setView(ViewState.DASHBOARD);
    }, 800);
  };

  // --- Workflow Logic ---
  const processNode = async (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    // Logic for NANO_EDIT (Generates or Edits Images)
    if (node.type === NodeType.NANO_EDIT) {
        // Gather Inputs
        const inputConnections = connections.filter(c => c.targetId === nodeId);
        
        const inputImages: string[] = [];
        const inputPrompts: string[] = [];

        // Add local prompt
        if (node.data.prompt) {
            inputPrompts.push(node.data.prompt);
        }

        // Process connected nodes
        let missingUpstreamData = false;

        inputConnections.forEach(conn => {
            const source = nodes.find(n => n.id === conn.sourceId);
            if (!source) return;

            // From Image Input
            if (source.type === NodeType.INPUT_IMAGE && source.data.imageData) {
                inputImages.push(source.data.imageData);
            }
            // From Previous Nano Node
            else if (source.type === NodeType.NANO_EDIT && source.data.outputImage) {
                inputImages.push(source.data.outputImage);
            }
            // From Gemini Pro (Use analysis as prompt)
            else if (source.type === NodeType.GEMINI_PRO) {
                if (source.data.analysisResult) {
                    inputPrompts.push(source.data.analysisResult);
                } else {
                    missingUpstreamData = true;
                }
            }
        });

        // Check upstream validity
        if (missingUpstreamData) {
            showNotification("Upstream Gemini node hasn't run yet. Please run it first.", 'error');
            updateNodeData(nodeId, { status: 'error', errorMessage: "Waiting for Gemini output" });
            return;
        }

        // Validation
        if (inputImages.length === 0 && inputPrompts.length === 0) {
          showNotification("Nano Node needs at least an input image or a prompt!", 'error');
          updateNodeData(nodeId, { status: 'error', errorMessage: "Missing inputs" });
          return;
        }

        // Update Status
        updateNodeData(nodeId, { status: 'processing', errorMessage: undefined });

        try {
          const resultBase64 = await GeminiService.generateOrEditImageWithNano(
            inputPrompts,
            inputImages
          );

          updateNodeData(nodeId, { status: 'success' });

          // Pass to Output
          const outConnections = connections.filter(c => c.sourceId === nodeId);
          outConnections.forEach(conn => {
            updateNodeData(conn.targetId, { outputImage: resultBase64 });
          });

        } catch (error: any) {
          console.error(error);
          updateNodeData(nodeId, { 
            status: 'error', 
            errorMessage: error.message || "Failed to generate image" 
          });
          showNotification("Generation failed. Check console.", 'error');
        }
    }
    
    // Logic for GEMINI_PRO (Image/Text -> Text Analysis)
    else if (node.type === NodeType.GEMINI_PRO) {
        const inputConnections = connections.filter(c => c.targetId === nodeId);
        let imageData: string | undefined = undefined;
        
        // Find first available image from inputs
        const imageSource = inputConnections.map(c => nodes.find(n => n.id === c.sourceId))
            .find(n => n?.data.imageData || n?.data.outputImage);

        if (imageSource) {
            imageData = imageSource.data.imageData || imageSource.data.outputImage;
        }

        updateNodeData(nodeId, { status: 'processing', errorMessage: undefined });

        try {
            const prompt = node.data.prompt || "Analyze this image and provide a detailed prompt for image generation.";
            const resultText = await GeminiService.analyzeWithGeminiPro(prompt, imageData);
            
            updateNodeData(nodeId, { 
                status: 'success',
                analysisResult: resultText
            });
            
            // Automatically notify connected Nano nodes that data is ready? 
            // In a real app, we might trigger downstream, but here we let user click Run.
            showNotification("Analysis complete. Ready to use in Nano node.", 'success');

        } catch (error: any) {
             console.error(error);
             updateNodeData(nodeId, { 
                status: 'error', 
                errorMessage: error.message || "Analysis failed" 
             });
             showNotification("Analysis failed.", 'error');
        }
    }
  };

  const updateNodeData = (id: string, data: any) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, data: { ...n.data, ...data } } : n));
  };

  const handleDeleteNode = (nodeId: string) => {
    // Remove the node
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    // Remove any connections associated with the node
    setConnections(prev => prev.filter(c => c.sourceId !== nodeId && c.targetId !== nodeId));
  };

  const showNotification = (msg: string, type: 'error' | 'info' | 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Handlers ---
  const handleConnectionCreate = (conn: Connection) => {
    setConnections(prev => [...prev, conn]);
  };

  const handleSaveWorkflow = () => {
      const newSave = {
          id: `save-${Date.now()}`,
          name: `Workflow ${new Date().toLocaleTimeString()}`,
          date: new Date().toISOString().split('T')[0],
          thumbnail: 'https://picsum.photos/400/300?random=' + Date.now(),
          nodesCount: nodes.length
      };
      setSavedWorkflows(prev => [newSave, ...prev]);
      showNotification("Workflow Saved Successfully!", 'success');
  };

  // --- Renders ---

  if (view === ViewState.LANDING || view === ViewState.FEATURES || view === ViewState.PRICING) {
    return (
        <LandingPage 
            currentView={view} 
            onNavigate={setView} 
            onLogin={handleLogin} 
        />
    );
  }

  if (view === ViewState.AUTH) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 animate-pulse">Authenticating Secure Session...</p>
        </div>
      </div>
    );
  }

  const DashboardHeader = () => (
    <header className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 z-50 relative">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(ViewState.LANDING)}>
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded"></div>
                <h1 className="font-bold text-lg tracking-tight hidden md:block">FlowGen AI</h1>
                <h1 className="font-bold text-lg tracking-tight md:hidden">FlowGen</h1>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-lg">
                <button 
                    onClick={() => setView(ViewState.DASHBOARD)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${view === ViewState.DASHBOARD ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    Editor
                </button>
                <button 
                    onClick={() => setView(ViewState.SAVED_CREATIONS)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${view === ViewState.SAVED_CREATIONS ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    Library
                </button>
            </nav>
        </div>
        
        {/* Mobile Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
            <div className="px-2 py-0.5 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-[10px] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Ready
            </div>
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300"
            >
                {isMobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
            </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
             {view === ViewState.DASHBOARD && (
                <button 
                    onClick={handleSaveWorkflow}
                    className="px-3 py-1.5 bg-primary/20 hover:bg-primary/40 text-primary text-xs font-semibold rounded border border-primary/30 transition-colors flex items-center gap-2"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                    Save Workflow
                </button>
             )}
            <div className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                System Ready
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600">
                <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full rounded-full opacity-80" />
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-surface border-b border-white/10 p-4 z-50 shadow-xl flex flex-col gap-3 md:hidden animate-in slide-in-from-top-2">
                <div className="flex gap-2 mb-2">
                    <button 
                        onClick={() => { setView(ViewState.DASHBOARD); setIsMobileMenuOpen(false); }} 
                        className={`flex-1 py-3 rounded font-medium text-sm ${view === ViewState.DASHBOARD ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/5 border border-white/5'}`}
                    >
                        Editor
                    </button>
                    <button 
                        onClick={() => { setView(ViewState.SAVED_CREATIONS); setIsMobileMenuOpen(false); }} 
                        className={`flex-1 py-3 rounded font-medium text-sm ${view === ViewState.SAVED_CREATIONS ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/5 border border-white/5'}`}
                    >
                        Library
                    </button>
                </div>
                
                {view === ViewState.DASHBOARD && (
                     <button onClick={() => { handleSaveWorkflow(); setIsMobileMenuOpen(false); }} className="py-3 bg-white/5 rounded flex items-center justify-center gap-2 text-sm hover:bg-white/10 border border-white/5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                        Save Workflow
                    </button>
                )}

                <div className="border-t border-white/10 pt-3 flex items-center gap-3 mt-1">
                    <div className="w-10 h-10 rounded-full bg-gray-700 border border-white/10 overflow-hidden">
                        <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full opacity-80" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">Demo User</span>
                        <span className="text-xs text-gray-400">Pro Plan</span>
                    </div>
                </div>
            </div>
        )}
    </header>
  );

  return (
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden font-sans">
      <DashboardHeader />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {view === ViewState.DASHBOARD && (
            <>
                <NodeCanvas 
                nodes={nodes} 
                connections={connections} 
                onNodesChange={setNodes}
                onConnectionCreate={handleConnectionCreate}
                onConnectionDelete={(id) => setConnections(prev => prev.filter(c => c.id !== id))}
                onNodeDelete={handleDeleteNode}
                onProcessNode={processNode}
                />

                {/* Floating Toolbar - Responsive */}
                <div className="absolute bottom-4 md:bottom-8 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-auto px-4 md:px-0 z-30 pointer-events-none">
                    <div className="bg-surface/90 backdrop-blur-lg border border-border rounded-2xl md:rounded-full p-2 shadow-2xl flex gap-2 overflow-x-auto md:overflow-visible pointer-events-auto max-w-full no-scrollbar">
                        {/* Add Image Node */}
                        <button 
                            className="p-3 hover:bg-white/10 rounded-full transition-colors group relative flex-shrink-0"
                            onClick={() => {
                                const id = `node-${Date.now()}`;
                                setNodes(prev => [...prev, {
                                    id,
                                    type: NodeType.INPUT_IMAGE,
                                    position: { x: 100, y: 100 },
                                    data: {},
                                    label: 'Source Image'
                                }]);
                            }}
                        >
                            <svg className="w-6 h-6 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Image</span>
                        </button>

                        {/* Add Nano Node */}
                        <button 
                            className="p-3 hover:bg-white/10 rounded-full transition-colors group relative flex-shrink-0"
                            onClick={() => {
                                const id = `node-${Date.now()}`;
                                setNodes(prev => [...prev, {
                                    id,
                                    type: NodeType.NANO_EDIT,
                                    position: { x: 300, y: 100 },
                                    data: { prompt: '' },
                                    label: 'Nano Editor'
                                }]);
                            }}
                        >
                            <svg className="w-6 h-6 text-secondary group-hover:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Nano AI</span>
                        </button>

                        {/* Add Gemini Pro Node */}
                        <button 
                            className="p-3 hover:bg-white/10 rounded-full transition-colors group relative flex-shrink-0"
                            onClick={() => {
                                const id = `node-${Date.now()}`;
                                setNodes(prev => [...prev, {
                                    id,
                                    type: NodeType.GEMINI_PRO,
                                    position: { x: 350, y: 200 },
                                    data: { prompt: '' },
                                    label: 'Gemini Pro'
                                }]);
                            }}
                        >
                            <svg className="w-6 h-6 text-accent group-hover:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Gemini Pro</span>
                        </button>

                        {/* Add Output Node */}
                        <button 
                            className="p-3 hover:bg-white/10 rounded-full transition-colors group relative flex-shrink-0"
                            onClick={() => {
                                const id = `node-${Date.now()}`;
                                setNodes(prev => [...prev, {
                                    id,
                                    type: NodeType.OUTPUT_PREVIEW,
                                    position: { x: 500, y: 100 },
                                    data: {},
                                    label: 'Preview'
                                }]);
                            }}
                        >
                            <svg className="w-6 h-6 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Output</span>
                        </button>
                    </div>
                </div>
            </>
        )}

        {view === ViewState.SAVED_CREATIONS && (
            <div className="h-full overflow-y-auto p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 md:mb-8">My Library</h2>
                    {savedWorkflows.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" /></svg>
                            <p>No saved workflows yet.</p>
                            <button onClick={() => setView(ViewState.DASHBOARD)} className="mt-4 text-primary hover:underline">Create your first workflow</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {savedWorkflows.map(item => (
                                <div key={item.id} className="bg-surface border border-white/5 rounded-xl overflow-hidden group hover:border-primary/50 transition-all shadow-lg">
                                    <div className="h-48 bg-black/20 relative overflow-hidden">
                                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => {
                                                    setView(ViewState.DASHBOARD);
                                                    showNotification(`Loaded "${item.name}"`, 'info');
                                                }}
                                                className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform"
                                            >
                                                Open
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-gray-200 truncate pr-2">{item.name}</h3>
                                            <button className="text-gray-500 hover:text-red-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{item.date}</span>
                                            <span className="px-2 py-1 bg-white/5 rounded">{item.nodesCount} Nodes</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Notifications */}
        {notification && (
            <div className={`absolute top-4 right-4 px-6 py-3 rounded shadow-lg text-sm font-semibold animate-bounce z-[60] ${
                notification.type === 'error' ? 'bg-red-500 text-white' : 
                notification.type === 'success' ? 'bg-green-500 text-white' :
                'bg-blue-500 text-white'
            }`}>
                {notification.msg}
            </div>
        )}
      </main>
    </div>
  );
}
