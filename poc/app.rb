require 'sinatra'

get '/' do
  <<~HTML
    <!DOCTYPE html>
    <html>
    <body>
      <div id="content-container">Loading dependency...</div>
      <script>
        // httpbin.org properly sends CORS headers with its 403
        fetch('https://httpbin.org/status/403')
          .then(response => {
            document.getElementById('content-container').innerText = `Status: ${response.status}`;
          });
      </script>
    </body>
    </html>
  HTML
end