const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello World</h1>');
});

const PORT = 3000; // Порт, на котором будет запущен сервер

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
