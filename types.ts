
export enum NodeType {
  INPUT_IMAGE = 'INPUT_IMAGE',
  NANO_EDIT = 'NANO_EDIT', // The "Nano Banana" / Gemini Flash Image node
  GEMINI_PRO = 'GEMINI_PRO', // The Gemini 3 Pro node for complex reasoning
  PROMPT_TEMPLATE = 'PROMPT_TEMPLATE', // Reusable text prompts
  OUTPUT_PREVIEW = 'OUTPUT_PREVIEW',
}

export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  // Input Node Data
  imageName?: string;
  imageData?: string; // Base64
  
  // Nano Edit & Gemini Pro Node Data
  prompt?: string;
  status?: 'idle' | 'processing' | 'success' | 'error';
  errorMessage?: string;
  
  // Gemini Pro Specific
  analysisResult?: string;
  
  // Output Node Data
  outputImage?: string; // Base64
}

export interface Node {
  id: string;
  type: NodeType;
  position: Position;
  data: NodeData;
  label: string;
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface WorkflowState {
  nodes: Node[];
  connections: Connection[];
}

export enum ViewState {
  LANDING = 'LANDING',
  FEATURES = 'FEATURES',
  PRICING = 'PRICING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  SAVED_CREATIONS = 'SAVED_CREATIONS',
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
}