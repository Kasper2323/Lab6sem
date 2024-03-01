const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentState = 'norm';

function handleInput(input) {
  input = input.trim();

  switch (input) {
    case 'norm':
    case 'stop':
    case 'test':
    case 'idle':
      currentState = input;
      console.log(`Состояние приложения изменено на: ${currentState}`);
      break;
    case 'exit':
      console.log('Приложение завершено.');
      process.exit(0);
    default:
      console.log(`Некорректное состояние: ${input}`);
      break;
  }

  rl.question('Введите новое состояние (norm, stop, test, idle) или exit для завершения: ', handleInput);
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // Включаем UTF-8 в заголовке
  res.end(`<h1>Состояние приложения: ${currentState}</h1>`);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  rl.question('Введите новое состояние (norm, stop, test, idle) или exit для завершения: ', handleInput);
});
