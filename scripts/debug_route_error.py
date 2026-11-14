import urllib.request
import urllib.error

url = "http://localhost:3001/academics/academic-calendar"
try:
    with urllib.request.urlopen(url) as resp:
        print(f"Status: {resp.getcode()}")
        print(resp.read().decode('utf-8')[:500])
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    print(e.read().decode('utf-8')[:1000])
except Exception as e:
    print(f"Exception: {e}")
