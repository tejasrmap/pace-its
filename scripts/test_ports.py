import urllib.request

for port in [3000, 3001]:
    try:
        req = urllib.request.Request(f'http://localhost:{port}')
        with urllib.request.urlopen(req, timeout=3) as resp:
            print(f"Port {port}: {resp.getcode()} (Server: {resp.headers.get('Server', '')})")
    except Exception as e:
        print(f"Port {port}: Error {e}")

