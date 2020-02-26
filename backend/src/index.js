const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();  //express cria um servidor para ser acessado pelo navegador

const server = require('http').Server(app);
const io = require('socket.io')(server);    //agora o server aceita tanto conexoes http quanto web socket

mongoose.connect('YOUR_MONGO_CONNECT', {
    useNewUrlParser: true,
});

app.use((req,res, next) => {
    req.io = io;    //todas as rotas daqui pra frente terao acesso a esse req.io

    next(); //vai garantir que seja executado e garantir que os outros midlewares tambem sejam executados
})

app.use(cors());   //ja permite que toda aplicacao utilize o backend

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);   //ouvir uma porta do navegador, padrao é a 80, localhost:3333

