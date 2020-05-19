const http = require('http');
const app = require('./app'); // app file include

const globalVariable = require('./nodemon');
//const port = process.env.port || globalVariable.port;
const port = process.env.PORT || 3000;

console.log("port ---->",port);

const server = http.createServer(app);
server.listen(port);