import requests
import os
import sys
from database import SessionLocal
from models import ChatSession, ChatMessage

API_URL = os.environ.get("API_URL", "http://localhost:8000")

def verify_delete():
    print("Starting verification...")
    
    # 1. Create a session
    print("Creating session...")
    try:
        res = requests.post(f"{API_URL}/sessions", json={"title": "Delete Test"})
        if res.status_code != 200:
            print(f"Failed to create session: {res.text}")
            return
        
        session_id = res.json()["id"]
        print(f"Session created: {session_id}")
    except Exception as e:
        print(f"Error connecting to API: {e}")
        return
    
    # 2. Verify in DB
    db = SessionLocal()
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        print("Session not found in DB!")
        return
    print("Session found in DB.")
    db.close()
    
    # 3. Delete session
    print("Deleting session...")
    res = requests.delete(f"{API_URL}/sessions/{session_id}")
    if res.status_code != 200:
        print(f"Failed to delete session: {res.text}")
        return
    print("Delete request successful.")
    
    # 4. Verify gone from DB
    db = SessionLocal()
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if session:
        print("Session STILL found in DB! Delete failed.")
    else:
        print("Session successfully removed from DB.")
    db.close()

    print("Verification complete.")

if __name__ == "__main__":
    verify_delete()
