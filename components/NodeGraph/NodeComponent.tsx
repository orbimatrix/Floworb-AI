
import React, { useRef } from 'react';
import { Node, NodeType, NodeData } from '../../types';

interface NodeComponentProps {
  node: Node;
  isDragging?: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onStartConnect: (e: React.MouseEvent | React.TouchEvent) => void;
  onEndConnect: (e: React.MouseEvent | React.TouchEvent) => void;
  onChange: (data: Partial<NodeData>) => void;
  onProcess: () => void;
  onDelete: () => void;
}

export const NodeComponent: React.FC<NodeComponentProps> = ({
  node,
  isDragging,
  onMouseDown,
  onTouchStart,
  onStartConnect,
  onEndConnect,
  onChange,
  onProcess,
  onDelete
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          onChange({ 
            imageName: file.name,
            imageData: evt.target.result as string 
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Render Content Based on Type ---
  const renderContent = () => {
    switch (node.type) {
      case NodeType.INPUT_IMAGE:
        return (
          <div className="space-y-3">
             <div 
                className="h-32 w-full bg-background/50 rounded border border-dashed border-gray-600 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onTouchEnd={() => fileInputRef.current?.click()}
             >
                {node.data.imageData ? (
                    <img src={node.data.imageData} alt="Input" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center p-2 text-xs text-gray-400">
                        Click to upload<br/>Source Image
                    </div>
                )}
             </div>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
             />
          </div>
        );

      case NodeType.PROMPT_TEMPLATE:
        return (
            <div className="space-y-3">
                <div className="text-[10px] text-gray-400 mb-1">Reuse this template in flows</div>
                <textarea 
                    className="w-full bg-background/50 rounded border border-border p-2 text-xs text-white focus:border-teal-400 outline-none resize-none"
                    rows={3}
                    placeholder="E.g., 'Cyberpunk style, neon lights...'"
                    value={node.data.prompt || ''}
                    onChange={(e) => onChange({ prompt: e.target.value })}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
            </div>
        );

      case NodeType.NANO_EDIT:
        return (
            <div className="space-y-3">
                <textarea 
                    className="w-full bg-background/50 rounded border border-border p-2 text-xs text-white focus:border-secondary outline-none resize-none"
                    rows={3}
                    placeholder="Describe the image to generate, or the edit to apply..."
                    value={node.data.prompt || ''}
                    onChange={(e) => onChange({ prompt: e.target.value })}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
                <div className="flex justify-between items-center">
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${
                        node.data.status === 'error' ? 'text-red-500' : 
                        node.data.status === 'success' ? 'text-green-500' : 
                        node.data.status === 'processing' ? 'text-yellow-500' : 'text-gray-500'
                    }`}>
                        {node.data.status || 'READY'}
                    </span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onProcess(); }}
                        onTouchEnd={(e) => { e.stopPropagation(); onProcess(); }}
                        disabled={node.data.status === 'processing'}
                        className="bg-secondary hover:bg-pink-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-colors disabled:opacity-50"
                    >
                        {node.data.status === 'processing' ? 'Generating...' : 'Run Flow'}
                    </button>
                </div>
                {node.data.errorMessage && (
                    <div className="text-[10px] text-red-400 leading-tight">
                        {node.data.errorMessage}
                    </div>
                )}
            </div>
        );

      case NodeType.GEMINI_PRO:
        return (
            <div className="space-y-3">
                <div className="text-[10px] text-gray-400 mb-1">Input Prompt / Instructions</div>
                <textarea 
                    className="w-full bg-background/50 rounded border border-border p-2 text-xs text-white focus:border-accent outline-none resize-none"
                    rows={3}
                    placeholder="E.g. 'Create a prompt for a sci-fi city'..."
                    value={node.data.prompt || ''}
                    onChange={(e) => onChange({ prompt: e.target.value })}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
                <div className="flex justify-between items-center">
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${
                        node.data.status === 'error' ? 'text-red-500' : 
                        node.data.status === 'success' ? 'text-accent' : 
                        node.data.status === 'processing' ? 'text-yellow-500' : 'text-gray-500'
                    }`}>
                        {node.data.status || 'READY'}
                    </span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onProcess(); }}
                        onTouchEnd={(e) => { e.stopPropagation(); onProcess(); }}
                        disabled={node.data.status === 'processing'}
                        className="bg-accent hover:bg-violet-600 text-white text-xs px-3 py-1 rounded shadow-lg transition-colors disabled:opacity-50"
                    >
                        {node.data.status === 'processing' ? 'Reasoning...' : 'Analyze'}
                    </button>
                </div>
                
                {/* Result Display for Text Output */}
                {node.data.analysisResult && (
                    <div className="mt-2 max-h-32 overflow-y-auto bg-black/30 p-2 rounded border border-white/10 text-[11px] text-gray-300 leading-relaxed" onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
                        <span className="text-[9px] text-gray-500 uppercase font-bold block mb-1">Output:</span>
                        {node.data.analysisResult}
                    </div>
                )}

                {node.data.errorMessage && (
                    <div className="text-[10px] text-red-400 leading-tight">
                        {node.data.errorMessage}
                    </div>
                )}
            </div>
        );
      
      case NodeType.VEO_VIDEO:
        return (
            <div className="space-y-3">
                <div className="text-[10px] text-gray-400 mb-1">Text Prompt for Video</div>
                <textarea 
                    className="w-full bg-background/50 rounded border border-border p-2 text-xs text-white focus:border-orange-500 outline-none resize-none"
                    rows={3}
                    placeholder="Describe the video you want to generate..."
                    value={node.data.prompt || ''}
                    onChange={(e) => onChange({ prompt: e.target.value })}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
                <div className="flex justify-between items-center">
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${
                        node.data.status === 'error' ? 'text-red-500' : 
                        node.data.status === 'success' ? 'text-green-500' : 
                        node.data.status === 'processing' ? 'text-yellow-500' : 'text-gray-500'
                    }`}>
                        {node.data.status || 'READY'}
                    </span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onProcess(); }}
                        onTouchEnd={(e) => { e.stopPropagation(); onProcess(); }}
                        disabled={node.data.status === 'processing'}
                        className="bg-orange-600 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded shadow-lg transition-colors disabled:opacity-50"
                    >
                        {node.data.status === 'processing' ? 'Generating...' : 'Create Video'}
                    </button>
                </div>
                
                {/* Video Output */}
                {node.data.videoUri && (
                    <div className="mt-2 rounded overflow-hidden border border-white/10 bg-black">
                        <video controls src={node.data.videoUri} className="w-full h-32 object-cover" />
                        <div className="p-1 text-right">
                             <a href={node.data.videoUri} download="veo-output.mp4" className="text-[10px] text-orange-400 hover:underline" onClick={e => e.stopPropagation()}>Download MP4</a>
                        </div>
                    </div>
                )}

                {node.data.errorMessage && (
                    <div className="text-[10px] text-red-400 leading-tight">
                        {node.data.errorMessage}
                    </div>
                )}
            </div>
        );

      case NodeType.OUTPUT_PREVIEW:
        return (
            <div className="h-48 w-full bg-background/50 rounded border border-border flex items-center justify-center overflow-hidden relative">
                {node.data.videoUri ? (
                    <video 
                        src={node.data.videoUri} 
                        controls 
                        className="w-full h-full object-contain" 
                    />
                ) : node.data.outputImage ? (
                    <img src={node.data.outputImage} alt="Output" className="w-full h-full object-contain" />
                ) : (
                    <span className="text-xs text-gray-500">Waiting for result...</span>
                )}
                
                {/* Download Buttons */}
                {node.data.outputImage && (
                    <a 
                        href={node.data.outputImage} 
                        download="flowgen-output.png"
                        className="absolute bottom-2 right-2 bg-black/70 text-white p-1 rounded hover:bg-primary"
                        onClick={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                )}
                {node.data.videoUri && (
                    <a 
                        href={node.data.videoUri} 
                        download="flowgen-video.mp4"
                        className="absolute bottom-2 right-2 bg-black/70 text-white p-1 rounded hover:bg-orange-500"
                        onClick={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </a>
                )}
            </div>
        );
        
      default:
        return null;
    }
  };

  // Colors based on type
  let borderColor = 'border-gray-600';
  let shadowColor = 'shadow-xl';
  let headerColor = 'bg-gray-600';
  let label = node.label;

  if (node.type === NodeType.INPUT_IMAGE) {
      borderColor = 'border-blue-500/50';
      headerColor = 'bg-blue-600';
  } else if (node.type === NodeType.NANO_EDIT) {
      borderColor = 'border-secondary/50';
      shadowColor = 'shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]';
      headerColor = 'bg-secondary';
  } else if (node.type === NodeType.GEMINI_PRO) {
      borderColor = 'border-accent/50';
      shadowColor = 'shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]';
      headerColor = 'bg-accent';
  } else if (node.type === NodeType.VEO_VIDEO) {
      borderColor = 'border-orange-500/50';
      shadowColor = 'shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]';
      headerColor = 'bg-orange-600';
  } else if (node.type === NodeType.PROMPT_TEMPLATE) {
      borderColor = 'border-teal-500/50';
      shadowColor = 'shadow-[0_0_20px_-5px_rgba(45,212,191,0.3)]';
      headerColor = 'bg-teal-600';
  } else if (node.type === NodeType.OUTPUT_PREVIEW) {
      borderColor = 'border-green-500/50';
      headerColor = 'bg-green-600';
  }

  const zIndex = isDragging ? 50 : 10;

  return (
    <div 
      className={`absolute w-72 bg-surface/95 backdrop-blur-md rounded-lg border ${borderColor} ${shadowColor} flex flex-col select-none transition-shadow duration-300`}
      style={{ 
          transform: `translate(${node.position.x}px, ${node.position.y}px)`,
          zIndex: zIndex
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* Node Header */}
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between bg-white/5 rounded-t-lg h-10 cursor-move">
        <span className="text-xs font-bold text-gray-200 uppercase tracking-wide flex items-center gap-2">
            {/* Icon based on type */}
            {node.type === NodeType.GEMINI_PRO && (
                 <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.8L19.3 19H4.7L12 5.8z"/></svg>
            )}
            {node.type === NodeType.VEO_VIDEO && (
                 <svg className="w-3 h-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            )}
            {node.type === NodeType.PROMPT_TEMPLATE && (
                <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )}
            {label}
        </span>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${headerColor} shadow-[0_0_5px_currentColor]`} />
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                onTouchEnd={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Delete Node"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </div>

      {/* Node Body */}
      <div className="p-3 relative cursor-default">
        {renderContent()}
        
        {/* Handles - Fixed relative to top for consistent alignment */}
        
        {/* Input Handle (Left) */}
        {node.type !== NodeType.INPUT_IMAGE && node.type !== NodeType.PROMPT_TEMPLATE && (
             <div 
             className="absolute -left-5 top-14 w-8 h-8 bg-transparent flex items-center justify-center cursor-crosshair node-handle z-20 group"
             title="Input"
             onMouseUp={onEndConnect}
             onTouchEnd={onEndConnect}
           >
             <div className="w-3 h-3 bg-surface border-2 border-gray-400 rounded-full group-hover:border-white group-hover:scale-125 transition-all shadow-sm" />
           </div>
        )}

        {/* Output Handle (Right) */}
        {node.type !== NodeType.OUTPUT_PREVIEW && (
             <div 
             className="absolute -right-5 top-14 w-8 h-8 bg-transparent flex items-center justify-center cursor-crosshair node-handle z-20 group"
             title="Output"
             onMouseDown={onStartConnect}
             onTouchStart={onStartConnect}
           >
             <div className="w-3 h-3 bg-surface border-2 border-primary rounded-full group-hover:border-white group-hover:scale-125 transition-all shadow-sm" />
           </div>
        )}
      </div>
    </div>
  );
};
