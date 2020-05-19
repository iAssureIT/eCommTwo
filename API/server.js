const http = require('http');
const app = require('./app'); // app file include

const globalVariable = require('./nodemon');
const port = globalVariable.port;

console.log("API is running on port ---> ",port);

const server = http.createServer(app);
server.listen(port);