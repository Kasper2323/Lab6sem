const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/api/name' && req.method === 'GET') {
        const fullName = 'Фамилия: Касперович, Имя: Артём, Отчество: Максимович'; // Замените на свои данные

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
