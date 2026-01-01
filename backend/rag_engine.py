import os
import chromadb
from groq import Groq
from dotenv import load_dotenv

# Load environment variables (GROQ_API_KEY)
load_dotenv()

class RagEngine:
    def __init__(self):
        # Initialize Groq Client
        self.groq_client = Groq(
            api_key=os.environ.get("GROQ_API_KEY"),
        )
        
        # Initialize ChromaDB (Persistent)
        self.chroma_client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.chroma_client.get_or_create_collection(name="founder_knowledge")

    def ingest_file(self, file_path: str):
        """Reads a text file and stores chunks in ChromaDB."""
        if not os.path.exists(file_path):
            print(f"Error: File {file_path} not found.")
            return

        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()

        # Simple splitting by paragraph for now (can be improved)
        chunks = [c.strip() for c in text.split("\n\n") if c.strip()]
        
        ids = [f"id_{i}" for i in range(len(chunks))]
        metadatas = [{"source": "faq"} for _ in chunks]

        # Chroma handles embedding automatically by default (using all-MiniLM-L6-v2)
        self.collection.upsert(
            documents=chunks,
            ids=ids,
            metadatas=metadatas
        )
        print(f"Ingested {len(chunks)} chunks into knowledge base.")

    def query(self, user_query: str):
        """Retrieves context and streams response from Groq."""
        
        # 1. Retrieve relevant context
        results = self.collection.query(
            query_texts=[user_query],
            n_results=2
        )
        
        context_text = "\n\n".join(results['documents'][0])
        
        system_prompt = f"""You are Rahul Jha, the Founder and Architect of Agnometry.
        You are speaking directly to a potential enterprise client.
        Use the following context to answer their question using your specific knowledge.
        
        CRITICAL INSTRUCTIONS:
        1. Be EXTREMELY CONCISE. Max 2-3 sentences.
        2. No fluff, no pleasantries, no marketing jargon.
        3. Tone: High-bandwidth, low-latency, sovereign intelligence.
        4. Focus on engineering density and ROI.
        
        CONTEXT:
        {context_text}
        """

        # 2. Call Groq API with streaming
        stream = self.groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_query}
            ],
            model="llama-3.1-8b-instant",
            stream=True,
        )

        return stream
