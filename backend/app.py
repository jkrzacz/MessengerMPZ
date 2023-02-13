from typing import Optional
from fastapi import FastAPI, status, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/', response_class=RedirectResponse, include_in_schema=False)
async def docs():
    return RedirectResponse(url='/docs')
