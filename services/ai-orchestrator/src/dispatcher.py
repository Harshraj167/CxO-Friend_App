import os
import random
import httpx
from pydantic import BaseModel

# 0-1-0-1 Dispatcher: Handles Quota Logic and Hybrid Routing
class AIRequest(BaseModel):
    user_id: str
    session_id: str
    message: str
    persona: str

class Dispatcher0101:
    def __init__(self):
        # Multi-account API keys mapping
        self.openrouter_keys = [
            os.getenv("OPENROUTER_KEY_1", "mock_key_1"),
            os.getenv("OPENROUTER_KEY_2", "mock_key_2")
        ]
        self.local_ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434")
        
        # Track usage to failover if quota exceeds
        self.usage_tracker = {key: 0 for key in self.openrouter_keys}
        self.QUOTA_LIMIT = 200 # requests per key per day for free tier

    def _get_best_key(self):
        # Round robin / lowest usage selection
        available_keys = [k for k, usage in self.usage_tracker.items() if usage < self.QUOTA_LIMIT]
        if not available_keys:
            return None # Fallback to local
        
        # Simple random selection for load balancing (can be round-robin stateful)
        return random.choice(available_keys)

    async def execute(self, req: AIRequest):
        best_key = self._get_best_key()
        
        if best_key:
            try:
                # Attempt Cloud API reasoning
                return await self._call_openrouter(best_key, req)
            except Exception as e:
                print(f"Cloud provider failed: {e}. Falling back to local.")
                return await self._call_ollama(req)
        else:
            # All quotas exhausted, enforce local fallback
            print("Quota exhausted or offline mode. Falling back to local.")
            return await self._call_ollama(req)

    async def _call_openrouter(self, key: str, req: AIRequest):
        self.usage_tracker[key] += 1
        # Mock API logic representing Langchain/OpenRouter binding
        # In real scenario, use httpx or langchain chat models
        return {
            "source": "cloud",
            "model": "mistralai/mistral-7b-instruct",
            "reply": f"As your {req.persona}, I have analyzed the request: {req.message}. Consider this done."
        }

    async def _call_ollama(self, req: AIRequest):
        # Mock local ollama API call
        return {
            "source": "local",
            "model": "llama3:8b",
            "reply": f"(Local execution) As your {req.persona}, I processed: {req.message}."
        }
