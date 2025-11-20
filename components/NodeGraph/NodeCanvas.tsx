
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

  // --- Helper to unify events ---
  const getClientCoords = (e: React.MouseEvent | React.TouchEvent | any) => {
      if (e.touches && e.touches.length > 0) {
          return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      }
      return { clientX: e.clientX, clientY: e.clientY };
  };

  // --- Dragging Logic ---
  const handleStartNodeDrag = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    
    const coords = getClientCoords(e);
    // Ensure we get the rect of the Node element, not the clicked child
    const targetElement = (e.currentTarget as HTMLElement); 
    const rect = targetElement.getBoundingClientRect();
    
    setDragOffset({
      x: coords.clientX - rect.left,
      y: coords.clientY - rect.top
    });
    setDraggingNodeId(id);
    
    // Bring to front by moving to end of array
    const otherNodes = nodes.filter(n => n.id !== id);
    onNodesChange([...otherNodes, node]);
  };

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const coords = getClientCoords(e);

      setMousePos({
        x: coords.clientX - rect.left,
        y: coords.clientY - rect.top
      });

      if (draggingNodeId) {
        e.preventDefault(); // Prevent scrolling while dragging
        const x = coords.clientX - rect.left - dragOffset.x;
        const y = coords.clientY - rect.top - dragOffset.y;

        onNodesChange(nodes.map(n => 
          n.id === draggingNodeId ? { ...n, position: { x, y } } : n
        ));
      }
    }
  }, [draggingNodeId, dragOffset, nodes, onNodesChange]);

  const handleEnd = () => {
    setDraggingNodeId(null);
    setConnectingSourceId(null);
  };

  // --- Connection Logic ---
  const handleStartConnection = (e: React.MouseEvent | React.TouchEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingSourceId(nodeId);
  };

  const handleEndConnection = (e: React.MouseEvent | React.TouchEvent, targetId: string) => {
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

  // Node width is w-72 (288px).
  // Handle vertical position is top-14 (56px).
  // Left Handle Center X = NodeX - 4.
  // Right Handle Center X = NodeX + 292.
  const HANDLE_Y_OFFSET = 56;
  const OUTPUT_X_OFFSET = 292;
  const INPUT_X_OFFSET = -4;

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full relative overflow-hidden bg-background cursor-crosshair touch-none"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
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

          const start = { x: source.position.x + OUTPUT_X_OFFSET, y: source.position.y + HANDLE_Y_OFFSET }; 
          const end = { x: target.position.x + INPUT_X_OFFSET, y: target.position.y + HANDLE_Y_OFFSET };
          
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
          const start = { x: source.position.x + OUTPUT_X_OFFSET, y: source.position.y + HANDLE_Y_OFFSET };
          return renderPath(start, mousePos, true);
        })()}
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <NodeComponent
          key={node.id}
          node={node}
          isDragging={draggingNodeId === node.id}
          onMouseDown={(e) => handleStartNodeDrag(e, node.id)}
          onTouchStart={(e) => handleStartNodeDrag(e, node.id)}
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