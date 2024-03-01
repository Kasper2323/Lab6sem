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
    } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Factorial Calculation</title>
            </head>
            <body>
                <h1>Factorial Calculation Results</h1>
                <div id="results"></div>
                <script>
                    async function calculateFactorials() {
                        const resultsDiv = document.getElementById('results');
                        let totalElapsedTime = 0;

                        for (let x = 1; x <= 20; x++) {
                            const startTime = new Date().getTime();
                            const response = await fetch(\`/fact?k=\${x}\`);
                            const data = await response.json();
                            const elapsedTime = new Date().getTime() - startTime;
                            totalElapsedTime += elapsedTime;

                            const result = document.createElement('p');
                            result.textContent = \`\${elapsedTime}ms - \${x}! = \${data.fact}\`;
                            resultsDiv.appendChild(result);
                        }

                        const totalResult = document.createElement('p');
                        totalResult.textContent = \`Total time taken for all requests: \${totalElapsedTime}ms\`;
                        resultsDiv.appendChild(totalResult);
                    }

                    calculateFactorials();
                </script>
            </body>
            </html>
        `);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid request');
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
