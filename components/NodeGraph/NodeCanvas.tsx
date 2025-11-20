
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Node, Connection, NodeType, Position } from '../../types';
import { NodeComponent } from './NodeComponent';

interface NodeCanvasProps {
  nodes: Node[];
  connections: Connection[];
  onNodesChange: (nodes: Node[]) => void;
  onConnectionCreate: (connection: Connection) => void;
  onConnectionDelete: (connectionId: string) => void;
  onNodeDelete: (nodeId: string) => void;
  onProcessNode: (nodeId: string) => void;
}

export const NodeCanvas: React.FC<NodeCanvasProps> = ({
  nodes,
  connections,
  onNodesChange,
  onConnectionCreate,
  onConnectionDelete,
  onNodeDelete,
  onProcessNode
}) => {
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // --- Dragging Logic ---
  const handleMouseDownNode = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    // Calculate offset from node top-left to mouse
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    
    if (canvasRect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    setDraggingNodeId(id);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    if (draggingNodeId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x;
      const y = e.clientY - rect.top - dragOffset.y;

      onNodesChange(nodes.map(n => 
        n.id === draggingNodeId ? { ...n, position: { x, y } } : n
      ));
    }
  }, [draggingNodeId, dragOffset, nodes, onNodesChange]);

  const handleMouseUp = () => {
    setDraggingNodeId(null);
    setConnectingSourceId(null);
  };

  // --- Connection Logic ---
  const handleStartConnection = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingSourceId(nodeId);
  };

  const handleEndConnection = (e: React.MouseEvent, targetId: string) => {
    e.stopPropagation();
    if (connectingSourceId && connectingSourceId !== targetId) {
      // Check if connection already exists
      const exists = connections.find(c => c.sourceId === connectingSourceId && c.targetId === targetId);
      if (!exists) {
         onConnectionCreate({
            id: `${connectingSourceId}-${targetId}-${Date.now()}`,
            sourceId: connectingSourceId,
            targetId
         });
      }
    }
    setConnectingSourceId(null);
  };

  // --- Rendering Lines ---
  const renderPath = (start: Position, end: Position, isDraft = false) => {
    const deltaX = Math.abs(end.x - start.x);
    const controlPointOffset = Math.max(deltaX * 0.5, 50);
    const path = `M ${start.x} ${start.y} C ${start.x + controlPointOffset} ${start.y}, ${end.x - controlPointOffset} ${end.y}, ${end.x} ${end.y}`;
    
    return (
      <path
        d={path}
        stroke={isDraft ? "#ec4899" : "#6366f1"}
        strokeWidth="3"
        fill="none"
        strokeDasharray={isDraft ? "5,5" : "none"}
        className="transition-all duration-300"
      />
    );
  };

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full relative overflow-hidden bg-background cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {/* Existing Connections */}
        {connections.map(conn => {
          const source = nodes.find(n => n.id === conn.sourceId);
          const target = nodes.find(n => n.id === conn.targetId);
          if (!source || !target) return null;

          // Simple calculation for handle positions: Source Right, Target Left
          const start = { x: source.position.x + 250, y: source.position.y + 60 }; // 250 is approx node width
          const end = { x: target.position.x, y: target.position.y + 60 };
          
          return (
            <g key={conn.id} className="pointer-events-auto cursor-pointer group" onClick={() => onConnectionDelete(conn.id)}>
              {renderPath(start, end)}
              <circle cx={(start.x + end.x)/2} cy={(start.y + end.y)/2} r="8" fill="#ef4444" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </g>
          );
        })}

        {/* Draft Connection */}
        {connectingSourceId && (() => {
          const source = nodes.find(n => n.id === connectingSourceId);
          if (!source) return null;
          const start = { x: source.position.x + 250, y: source.position.y + 60 };
          return renderPath(start, mousePos, true);
        })()}
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <NodeComponent
          key={node.id}
          node={node}
          onMouseDown={(e) => handleMouseDownNode(e, node.id)}
          onStartConnect={(e) => handleStartConnection(e, node.id)}
          onEndConnect={(e) => handleEndConnection(e, node.id)}
          onDelete={() => onNodeDelete(node.id)}
          onChange={(data) => {
            onNodesChange(nodes.map(n => n.id === node.id ? { ...n, data: { ...n.data, ...data } } : n));
          }}
          onProcess={() => onProcessNode(node.id)}
        />
      ))}
    </div>
  );
};
