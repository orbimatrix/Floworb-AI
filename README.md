# FlowGen AI 🎨 🤖

**FlowGen AI** is a professional, node-based SaaS web application for real-time AI image generation and editing. It leverages the power of the **Google Gemini API** to create complex visual workflows.

Users can design pipelines that combine visual inputs, reusable prompt templates, and advanced reasoning (Gemini 3 Pro) to drive high-speed image generation and editing via the "Nano Banana" (Gemini 2.5 Flash Image) model.

---

## 🚀 Key Features

-   **Visual Node Editor**: A drag-and-drop infinite canvas to design AI workflows.
-   **Gemini 2.5 Flash Image ("Nano Banana")**: Ultra-fast image generation and image-to-image editing.
-   **Gemini 3 Pro Integration**: Use advanced reasoning to analyze input images or prompts and generate detailed instructions for the image generator.
-   **Prompt Templates**: Create reusable text blocks to standardize styles across your workflows.
-   **Smart Connections**: Intelligent validation ensures data flows correctly from prompts/images to the generation models.
-   **Responsive Design**: Fully functional on desktop and mobile devices.

---

## 🛠️ Tech Stack

-   **Frontend Library**: React 19
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **AI Integration**: Google GenAI SDK (`@google/genai`)
-   **Models Used**:
    -   `gemini-2.5-flash-image` (Generation/Editing)
    -   `gemini-3-pro-preview` (Reasoning/Analysis)

---

## 📦 Installation & Setup

1.  **Clone the repository** (or download the source files).

2.  **Install Dependencies**:
    Ensure you have Node.js installed, then run:
    ```bash
    npm install
    ```

3.  **Configure API Key**:
    The application requires a Google GenAI API Key.
    -   Create a `.env` file in the root directory.
    -   Add your API key:
        ```env
        API_KEY=your_google_genai_api_key_here
        ```
    -   *Note: In the provided source, the key is accessed via `process.env.API_KEY`. Ensure your build tool (Vite/Webpack) is configured to expose this.*

4.  **Run the Application**:
    ```bash
    npm start
    # or
    npm run dev
    ```

---

## 🎮 How to Use

### Basic Workflow
1.  **Add an Image**: Click "Add Image" in the toolbar and upload a source file.
2.  **Add a Nano Editor**: Click "Add Nano AI". This is your generator.
3.  **Connect**: Drag a line from the Image Node's *Output* handle to the Nano Node's *Input* handle.
4.  **Prompt**: Type a prompt into the Nano Node (e.g., "Make it look like a sketch").
5.  **Run**: Click "Run Flow" on the Nano Node.
6.  **Preview**: Connect the Nano Node to an "Output Node" to view and download the result.

### Advanced Reasoning Workflow
1.  **Add Gemini Pro**: Click "Add Gemini Pro".
2.  **Connect**: Connect an Input Image or write a request in the Gemini Pro node (e.g., "Analyze this image and describe a futuristic version of it").
3.  **Run Gemini**: Click "Analyze". The node will generate a detailed description.
4.  **Chain to Nano**: Connect the **Gemini Pro** node to a **Nano Editor** node. The Nano node will use the Gemini Pro output as its instruction prompt.
5.  **Generate**: Run the Nano node to create the image based on the reasoning.

### Using Templates
1.  **Add Template**: Click "Add Template".
2.  **Define Style**: Enter a reusable style (e.g., "Cyberpunk style, neon lights, high contrast").
3.  **Connect**: Connect the Template node to one or more Nano Editor nodes to apply that style dynamically.

---

## 🧩 Node Types

| Node Type | Function |
| :--- | :--- |
| **Input Image** | Uploads an image from your device to be used as a reference. |
| **Prompt Template** | A reusable text block for styles or common instructions. |
| **Gemini Pro** | The "Brain". Uses `gemini-3-pro` to reason, analyze images, or expand simple ideas into complex prompts. |
| **Nano Editor** | The "Artist". Uses `gemini-2.5-flash-image` to generate or edit images based on inputs. |
| **Output Preview** | Displays the final generated image and allows downloading. |

---

## 🛡️ Troubleshooting

-   **"AI Service not initialized"**: Ensure your `API_KEY` is correctly set in your environment variables.
-   **Node connections not working**: Ensure you are dragging from a Right handle (Output) to a Left handle (Input).
-   **"Upstream Gemini node hasn't run"**: If a Nano node is connected to a Gemini Pro node, you must click "Analyze" on the Gemini Pro node first to generate the text data.

---

© 2024 FlowGen AI. Built with Google Gemini.
