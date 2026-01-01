# Project Handover: Agnometry "Founder Agent"

## Project Overview
**Agnometry** is a high-end, award-winning landing page for a Sovereign Agentic Framework. The design aesthetic is "World Class," "Cinematic," and "Editorial" (Obsidian background, glassmorphism, kinetic typography).

## Current Objective
We are building a **"Founder Agent"** feature: a voice-activated interface where the user can talk to an AI representation of the founder (Rahul Jha). It requires a specific **Hybrid Architecture** for low latency.

## Architecture Status

### 1. Backend (The Brain) - ✅ Phase 1 Complete
*   **Location**: `/backend`
*   **Tech**: Python, FastAPI, Groq (`llama3-8b-8192`), ChromaDB.
*   **Status**:
    *   `server.py`: WebSocket endpoint `/ws` created.
    *   `rag_engine.py`: ChromaDB ingestion and Groq streaming implemented.
    *   `data/faq.txt`: Sample data created.
*   **Pending**: Needs to be run (`uvicorn server:app --reload`) and tested with a client.

### 2. Frontend (The Voice) - ⏳ Phase 2 Pending
*   **Location**: `/ (Root)`
*   **Tech**: React, Vite, WebAssembly (WASM).
*   **Requirement**:
    *   **TTS**: Must use **in-browser WASM** (e.g., `sherpa-onnx-wasm`) to generate audio locally to save server costs/latency. **Do not use server-side TTS.**
    *   **STT**: Browser native or WASM.
    *   **Audio**: Web Audio API `AudioWorklet` for smooth streaming.

## Next Steps for the AI Developer

### Phase 2: Frontend Voice Engine (Immediate Next Task)
**Goal**: Enable the browser to speak without hitting the server for audio.
1.  **Install Libraries**: Set up `sherpa-onnx-wasm` or similar in the React project.
2.  **VoiceAgent Component**: Create a hook/component that loads the ONNX model into memory.
3.  **Test**: Add a button that speaks "System Ready" using purely client-side compute.

### Phase 3: Integration
**Goal**: Connect the "Brain" to the "Voice".
1.  **WebSockets**: Connect React to `ws://localhost:8000/ws`.
2.  **Stream-to-Speech**:
    *   User speaks -> Text (STT) -> Send to Server.
    *   Server (Groq) -> Streams Text Tokens -> Client.
    *   Client -> Feeds tokens to WASM TTS -> Audio Output.
3.  **UI**: Trigger the agent via the "Connect" button in the `Team` section opacity layer.

## Key Files Context

### `backend/server.py`
```python
from fastapi import FastAPI, WebSocket
from rag_engine import RagEngine

app = FastAPI()
brain = RagEngine()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text() # User query
        stream = brain.query(data)
        for chunk in stream:
            # Stream text tokens back to client
            if chunk.choices[0].delta.content:
                await websocket.send_text(chunk.choices[0].delta.content)
        await websocket.send_text("<END_OF_TURN>")
```

### `backend/rag_engine.py` (Snippet)
```python
# Uses Groq for Speed + ChromaDB for Context
def query(self, user_query: str):
    results = self.collection.query(query_texts=[user_query], n_results=2)
    # ... constructs prompt ...
    return self.groq_client.chat.completions.create(..., stream=True)
```

## Design Guidelines
*   **Visuals**: Dark mode only (`bg-obsidian`). Use `void` aesthetics.
*   **Typography**: Serif (Editorial) + Mono (Technical).
*   **Animations**: Framer Motion for UI, CSS Keyframes for loops. No jittery physics.
