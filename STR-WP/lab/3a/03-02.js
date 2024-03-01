const http = require('http');
const url = require('url');

// Функция для вычисления факториала
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const k = parseInt(queryObject.k);

    if (req.url.startsWith('/fact') && req.method === 'GET' && !isNaN(k)) {
        const fact = factorial(k);
        const responseJSON = JSON.stringify({ k, fact });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(responseJSON);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid request');
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
