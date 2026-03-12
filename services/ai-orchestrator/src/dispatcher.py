import os
import random
import httpx
from pydantic import BaseModel

from .inference import InferenceEngine
from .ethics import EthicsFilter

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
        
        self.inference_engine = InferenceEngine()
        self.ethics_filter = EthicsFilter()
        
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

    async def _normalize_hinglish(self, msg: str) -> str:
        # Mock ML translation layer for Hinglish to English
        # e.g., "Bhai yeh sales data download kar do" -> "Brother, please download this sales data"
        hinglish_dict = {
            "bhai": "Brother,",
            "yeh": "this",
            "kar do": "please do",
            "kya": "what",
            "jaldi": "quickly"
        }
        normalized = msg
        for k, v in hinglish_dict.items():
            normalized = normalized.replace(k, v)
        return normalized

    async def execute(self, req: AIRequest):
        best_key = self._get_best_key()
        
        # 1. Zero-trust PII masking
        req.message = self.ethics_filter.mask_pii(req.message)
        
        # 2. Harmful intent check
        if self.ethics_filter.detect_harmful_intent(req.message):
            return {
                "source": "ethics_guard",
                "model": "rule-based",
                "reply": "I cannot fulfill this request due to potentially harmful intent."
            }

        # 3. Transliteration (Hinglish to English)
        req.message = await self._normalize_hinglish(req.message)
        
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
        # Use Langchain wrapper
        reply = await self.inference_engine.execute_cloud(req.message, req.persona)
        return {
            "source": "cloud",
            "model": "mistralai/mistral-7b-instruct-langchain",
            "reply": reply
        }

    async def _call_ollama(self, req: AIRequest):
        reply = await self.inference_engine.execute_local(req.message, req.persona)
        return {
            "source": "local",
            "model": "llama3:8b-langchain",
            "reply": reply
        }
