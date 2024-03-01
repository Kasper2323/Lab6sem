const http = require('http');
const url = require('url');

// Асинхронная функция для вычисления факториала
function factorialAsync(n, callback) {
    if (n === 0 || n === 1) {
        setImmediate(() => callback(null, 1));
    } else {
        let result = 1;
        function multiply(i) {
            if (i <= n) {
                result *= i;
                setImmediate(() => multiply(i + 1));
            } else {
                setImmediate(() => callback(null, result));
            }
        }
        multiply(2);
    }
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const k = parseInt(queryObject.k);

    if (req.url.startsWith('/fact') && req.method === 'GET' && !isNaN(k)) {
        factorialAsync(k, (err, fact) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const responseJSON = JSON.stringify({ k, fact });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(responseJSON);
            }
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid request');
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
