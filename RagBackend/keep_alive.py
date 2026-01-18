import requests
import time
import sys

def keep_alive(url, interval=3600):
    """
    Pings the given URL every 'interval' seconds.
    Default interval is 1 hour (3600 seconds).
    """
    print(f"Starting keep-alive for {url}")
    print(f"Ping interval: {interval} seconds")
    
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"[{time.ctime()}] Ping successful! Status: {response.status_code}")
            else:
                print(f"[{time.ctime()}] Ping failed. Status: {response.status_code}")
        except Exception as e:
            print(f"[{time.ctime()}] Error pinging server: {e}")
        
        time.sleep(interval)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python keep_alive.py <YOUR_RENDER_URL>")
        print("Example: python keep_alive.py https://my-rag-app.onrender.com/health")
        sys.exit(1)
    
    target_url = sys.argv[1]
    keep_alive(target_url)
