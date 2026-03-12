import os
from langchain.chat_models import ChatOpenAI
from langchain.chat_models import ChatOllama
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

class InferenceEngine:
    def __init__(self):
        # We use ChatOpenAI class but point it to OpenRouter / Perplexity if preferred
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
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are the {persona} for CxO-Friend Enterprise. Answer concisely."),
            ("user", "{message}")
        ])
        chain = prompt | self.cloud_llm | self.parser
        
        # in production, remove mock wrap
        if os.getenv("OPENROUTER_KEY", "mock_key") == "mock_key":
             return f"[Simulated Cloud {persona}] I suggest prioritizing the high-ROI tasks."
             
        return await chain.ainvoke({"persona": persona, "message": message})
        
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
