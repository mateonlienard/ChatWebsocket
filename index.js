const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
let {Server: HttpServer} = require("http");
let path = require('path');
let serverRoutes = require('./routes');

let Socket = require('./utils/sockets')

// Middlewates
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join('public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

serverRoutes(app);

let httpServer = new HttpServer(app);

let socket = new Socket(httpServer);
socket.init();

httpServer.listen(PORT, ()=>{console.log(`http://localhost:${PORT}`)});