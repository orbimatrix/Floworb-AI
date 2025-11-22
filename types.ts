
export enum NodeType {
  INPUT_IMAGE = 'INPUT_IMAGE',
  NANO_EDIT = 'NANO_EDIT', // The "Nano Banana" / Gemini Flash Image node
  GEMINI_PRO = 'GEMINI_PRO', // The Gemini 3 Pro node for complex reasoning
  VEO_VIDEO = 'VEO_VIDEO', // Veo 3 Video Generation Node
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
  
  // Nano Edit & Gemini Pro & Veo Node Data
  prompt?: string;
  status?: 'idle' | 'processing' | 'success' | 'error';
  errorMessage?: string;
  
  // Gemini Pro Specific
  analysisResult?: string;
  
  // Output Node Data
  outputImage?: string; // Base64
  
  // Veo Specific
  videoUri?: string; // Blob URL for the generated video
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
  RESOURCES = 'RESOURCES',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  SAVED_CREATIONS = 'SAVED_CREATIONS',
  
  // Product Pages
  CHANGELOG = 'CHANGELOG',
  DOCS = 'DOCS',
  
  // Resource Pages
  COMMUNITY = 'COMMUNITY',
  HELP_CENTER = 'HELP_CENTER',
  TUTORIALS = 'TUTORIALS',
  
  // Company Pages
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  CAREERS = 'CAREERS',
  
  // Legal Pages
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY'
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
}