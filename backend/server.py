from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from rag_engine import RagEngine
import os
import asyncio
import traceback
import time

app = FastAPI()

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Brain
brain = RagEngine()

@app.on_event("startup")
async def startup_event():
    # Ingest FAQ data on startup
    for path in ["./data/faq.txt", "data/faq.txt"]:
        if os.path.exists(path):
            print(f"[Server] Ingesting knowledge from {path}")
            brain.ingest_file(path)
            break
    else:
        print("[Server] No FAQ data found.")
    
    # Start heartbeat task
    asyncio.create_task(heartbeat())

async def heartbeat():
    while True:
        print(f"[Server] Heartbeat - {time.strftime('%X')}")
        await asyncio.sleep(10)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("[Server] Client connected")
    
    try:
        while True:
            # Receive text from client with timeout
            try:
                data = await asyncio.wait_for(
                    websocket.receive_text(),
                    timeout=300  # 5 minute timeout
                )
            except asyncio.TimeoutError:
                print("[Server] Connection timeout, closing")
                break
            
            if not data or not data.strip():
                continue
                
            print(f"[Server] Received: {data}")
            
            try:
                # Query the RAG engine and stream response
                stream = brain.query(data)
                
                full_response = ""
                
                for chunk in stream:
                    if chunk.choices and chunk.choices[0].delta.content:
                        token = chunk.choices[0].delta.content
                        full_response += token
                        
                        # Send token immediately to client
                        await websocket.send_text(token)
                
                print(f"[Server] Full response: {full_response[:100]}...")
                
            except Exception as e:
                print(f"[Server] Processing error: {e}")
                traceback.print_exc()
                await websocket.send_text("Error processing request.")
            
            # Signal end of turn
            try:
                await websocket.send_text("<END_OF_TURN>")
            except:
                break
                
    except WebSocketDisconnect:
        print("[Server] Client disconnected normally")
    except Exception as e:
        print(f"[Server] Connection error: {e}")
        traceback.print_exc()
    finally:
        print("[Server] Connection closed")
