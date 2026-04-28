require 'sinatra'

get '/' do
  <<~HTML
    <!DOCTYPE html>
    <html>
    <body>
      <div id="content-container">Loading dependency...</div>
      
      <script>
        // The browser hits an external API that returns a 403
        fetch('https://httpstat.us/403')
          .then(response => {
            document.getElementById('content-container').innerText = `Status: ${response.status}`;
          });
      </script>
    </body>
    </html>
  HTML
end