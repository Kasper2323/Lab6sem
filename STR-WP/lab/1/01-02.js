const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Обработка GET запроса
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url, true);

    // Формируем HTML страницу с информацией о запросе
    const responseHTML = `
      <html>
        <head>
          <title>GET Request Info</title>
        </head>
        <body>
          <h1>GET Request Info</h1>
          <p>Method: ${req.method}</p>
          <p>URI: ${parsedUrl.pathname}</p>
          <p>Protocol Version: ${req.httpVersion}</p>
          <h2>Headers:</h2>
          <pre>${JSON.stringify(req.headers, null, 2)}</pre>
        </body>
      </html>
    `;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(responseHTML);
  }

  // Обработка POST запроса
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // Преобразуем буфер в строку
    });

    req.on('end', () => {
      // Формируем HTML страницу с информацией о запросе и теле сообщения
      const responseHTML = `
        <html>
          <head>
            <title>POST Request Info</title>
          </head>
          <body>
            <h1>POST Request Info</h1>
            <p>Method: ${req.method}</p>
            <p>URI: ${req.url}</p>
            <p>Protocol Version: ${req.httpVersion}</p>
            <h2>Headers:</h2>
            <pre>${JSON.stringify(req.headers, null, 2)}</pre>
            <h2>Body:</h2>
            <pre>${body}</pre>
            чипи чапа
          </body>
        </html>
      `;

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(responseHTML);
    });
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});