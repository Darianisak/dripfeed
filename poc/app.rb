require 'sinatra'

get '/' do
  <<~HTML
    <!DOCTYPE html>
    <html>
    <body>
      <div id="content-container">Loading dependency...</div>
      <script>
        fetch('https://httpbin.org/status/403')
          .then(response => {
            document.getElementById('content-container').innerText = `Status: ${response.status}`;
          })
          .catch(error => {
            // If headless Firefox kills the request, print the reason
            document.getElementById('content-container').innerText = `JS Error: ${error.message}`;
          });
      </script>
    </body>
    </html>
  HTML
end