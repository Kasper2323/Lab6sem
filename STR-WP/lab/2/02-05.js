const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/fetch' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'fetch.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/api/name' && req.method === 'GET') {
        const fullName = 'Фамилия: Иванов, Имя: Иван, Отчество: Иванович'; // Замените на свои данные

        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // Указываем UTF-8
        res.end(fullName);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
