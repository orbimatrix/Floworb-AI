
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

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
  const [connections, setConnections] = useState<Connection[]>(INITIAL_CONNECTIONS);
  const [notification, setNotification] = useState<{msg: string, type: 'error' | 'info'} | null>(null);

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

    // Logic for NANO_EDIT (Image -> Image)
    if (node.type === NodeType.NANO_EDIT) {
        // 1. Check Inputs
        const inputConnection = connections.find(c => c.targetId === nodeId);
        if (!inputConnection) {
          showNotification("No input image connected!", 'error');
          return;
        }

        const sourceNode = nodes.find(n => n.id === inputConnection.sourceId);
        if (!sourceNode?.data.imageData) {
          showNotification("Source node has no image data!", 'error');
          return;
        }

        // 2. Update Status
        updateNodeData(nodeId, { status: 'processing', errorMessage: undefined });

        try {
          const prompt = node.data.prompt || "Enhance image";
          
          const resultBase64 = await GeminiService.editImageWithNano(
            sourceNode.data.imageData,
            prompt
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
        const inputConnection = connections.find(c => c.targetId === nodeId);
        let imageData: string | undefined = undefined;

        if (inputConnection) {
            const sourceNode = nodes.find(n => n.id === inputConnection.sourceId);
            if (sourceNode?.data.imageData) {
                imageData = sourceNode.data.imageData;
            }
            // Check if source has outputImage (like from Nano Edit)
            if (sourceNode?.data.outputImage) {
                imageData = sourceNode.data.outputImage;
            }
        }

        updateNodeData(nodeId, { status: 'processing', errorMessage: undefined });

        try {
            const prompt = node.data.prompt || "Analyze this";
            const resultText = await GeminiService.analyzeWithGeminiPro(prompt, imageData);
            
            updateNodeData(nodeId, { 
                status: 'success',
                analysisResult: resultText
            });

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

  const showNotification = (msg: string, type: 'error' | 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- Handlers ---
  const handleConnectionCreate = (conn: Connection) => {
    setConnections(prev => [...prev, conn]);
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

  return (
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden font-sans">
      {/* Header */}
      <header className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(ViewState.LANDING)}>
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded"></div>
          <h1 className="font-bold text-lg tracking-tight">FlowGen AI <span className="text-xs font-normal text-gray-500 ml-2">v2.1.0 Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded text-green-400 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Gemini 3 & Nano Ready
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600">
                <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full rounded-full opacity-80" />
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <NodeCanvas 
          nodes={nodes} 
          connections={connections} 
          onNodesChange={setNodes}
          onConnectionCreate={handleConnectionCreate}
          onConnectionDelete={(id) => setConnections(prev => prev.filter(c => c.id !== id))}
          onNodeDelete={handleDeleteNode}
          onProcessNode={processNode}
        />

        {/* Floating Toolbar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-border rounded-full p-2 shadow-2xl flex gap-2 z-30">
            {/* Add Image Node */}
            <button 
                className="p-3 hover:bg-white/10 rounded-full transition-colors group relative"
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
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Image</span>
            </button>

            {/* Add Nano Node */}
            <button 
                className="p-3 hover:bg-white/10 rounded-full transition-colors group relative"
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
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Nano AI</span>
            </button>

            {/* Add Gemini Pro Node */}
            <button 
                className="p-3 hover:bg-white/10 rounded-full transition-colors group relative"
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
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Gemini Pro</span>
            </button>

             {/* Add Output Node */}
             <button 
                className="p-3 hover:bg-white/10 rounded-full transition-colors group relative"
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
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add Output</span>
            </button>
        </div>

        {/* Notifications */}
        {notification && (
            <div className={`absolute top-4 right-4 px-6 py-3 rounded shadow-lg text-sm font-semibold animate-bounce ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                {notification.msg}
            </div>
        )}
      </main>
    </div>
  );
}
