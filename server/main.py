from http.server import BaseHTTPRequestHandler, HTTPServer

class Server(BaseHTTPRequestHandler):
  def do_POST(self):
    if self.path == "/multimedia":
      self.send_response(200)
      self.send_header("Content-type", "text/html")
      self.end_headers()

      message = "Hello World! Here is a POST response"
      self.wfile.write(bytes(message, "utf8"))

  def do_GET(self):
    self.send_response(200)

    self.send_header("Content-type", "text/html")
    self.end_headers()

    self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
    self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
    self.wfile.write(bytes("<body>", "utf-8"))
    self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
    self.wfile.write(bytes("</body></html>", "utf-8"))


if __name__ == "__main__":
  hostName = "localhost"
  port = 8080

  webServer = HTTPServer((hostName, port), Server)
  print(f"Server started at http:{hostName}:{port}")

  try:
    webServer.serve_forever()
  except KeyboardInterrupt:
    pass

  webServer.server_close()
  print("Server stopped")