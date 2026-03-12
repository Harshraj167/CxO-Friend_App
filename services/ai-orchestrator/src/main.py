from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import os

from src.dispatcher import Dispatcher0101, AIRequest

app = FastAPI(
    title="CxO-Friend AI Orchestrator",
    description="Python layer handling 0-1-0-1 failover routing and Langchain inferences."
)

dispatcher = Dispatcher0101()

@app.middleware("http")
async def verify_internal_auth(request: Request, call_next):
    # Verify requests come from the Node Gateway
    auth_header = request.headers.get("authorization")
    expected = f"Bearer {os.getenv('INTERNAL_SERVICE_KEY', 'default_internal_key')}"
    
    if request.url.path not in ["/docs", "/openapi.json", "/health"]:
        if auth_header != expected:
            # Uncomment for production
            # return JSONResponse(status_code=403, content={"error": "Unauthorized orchestrator access"})
            pass
            
    response = await call_next(request)
    return response


@app.get("/health")
async def health_check():
    return {"status": "online", "service": "Python Orchestrator v6.5.1"}

@app.post("/api/ai/chat")
async def process_chat(req: AIRequest):
    try:
        # Utilize the 0-1-0-1 Load balancer
        result = await dispatcher.execute(req)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
