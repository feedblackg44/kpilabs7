const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(__dirname + '/style.css');
});

let messages = [];

io.on('connection', (socket) => {
    console.log('User connected');

    // Передача истории сообщений новому пользователю
    socket.emit('chat history', messages);

    let username = "";

    socket.on('set username', (name) => {
        username = name;
    });

    socket.on('chat message', (message) => {
        const formattedMessage = `${username}: ${message}`;
        messages.push(formattedMessage);

        // Отправка сообщения всем подключенным пользователям
        io.emit('chat message', formattedMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('The server is running on port 3000');
});

