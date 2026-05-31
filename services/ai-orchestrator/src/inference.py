import os
import httpx
from langchain.chat_models import ChatOpenAI
from langchain.chat_models import ChatOllama
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

class InferenceEngine:
    def __init__(self):
        # We use ChatOpenAI class but point it to OpenRouter if preferred
        self.cloud_llm = ChatOpenAI(
            model="mistralai/mixtral-8x7b-instruct",
            openai_api_base="https://openrouter.ai/api/v1",
            openai_api_key=os.getenv("OPENROUTER_KEY", "mock_key"),
            max_tokens=1000
        )
        # Local fallback
        self.local_llm = ChatOllama(
            model="llama3:8b",
            base_url=os.getenv("OLLAMA_URL", "http://localhost:11434")
        )
        self.parser = StrOutputParser()

    async def execute_cloud(self, message: str, persona: str) -> str:
        # Prioritize Google Gemini API using the default Gemini key
        gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("GEMINI_DEFAULT_KEY")
        if gemini_key and gemini_key != "mock_key":
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            system_instruction = f"You are the {persona} for CxO-Friend Enterprise. Answer concisely."
            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": f"System Instruction: {system_instruction}\nUser Prompt: {message}"}]
                    }
                ]
            }
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.post(url, json=payload, timeout=30.0)
                    if response.status_code == 200:
                        data = response.json()
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        return text.strip()
                    else:
                        print(f"Gemini API returned error {response.status_code}: {response.text}")
            except Exception as e:
                print(f"Failed calling Gemini API: {e}")

        # Fallback to OpenRouter (LangChain)
        openrouter_key = os.getenv("OPENROUTER_KEY") or os.getenv("OPENROUTER_KEY_1")
        if openrouter_key and openrouter_key != "mock_key" and openrouter_key != "mock_key_1":
            prompt = ChatPromptTemplate.from_messages([
                ("system", "You are the {persona} for CxO-Friend Enterprise. Answer concisely."),
                ("user", "{message}")
            ])
            chain = prompt | self.cloud_llm | self.parser
            return await chain.ainvoke({"persona": persona, "message": message})
             
        return f"[Simulated Cloud {persona}] I suggest prioritizing the high-ROI tasks using Gemini intelligence."
        
    async def execute_local(self, message: str, persona: str) -> str:
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are the {persona} for CxO-Friend Enterprise. Answer concisely (Offline mode)."),
            ("user", "{message}")
        ])
        chain = prompt | self.local_llm | self.parser
        
        try:
             return await chain.ainvoke({"persona": persona, "message": message})
        except Exception:
             return f"[Simulated Local {persona}] Offline inference executed."
