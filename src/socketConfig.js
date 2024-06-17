import { Server } from "socket.io";
import MessageManager from "./dao/mongodb/chat.dao.js";
export const configureSocket = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', async (socket) => {
        console.log(`🟢 Usuerio conectado: ${socket.id}`);
        socketServer.emit('messages', await MessageManager.getAll()); //emite a todos los clientes
    
        socket.on('disconnect', () => {
            console.log(`🔴 Usuario desconectado`, socket.id);
        });
    
        socket.on('newUser', (user) => {
            console.log(`> ${user} ha iniciado sesión`);
            socket.broadcast.emit('newUser', user)
        });
    
        socket.on('chatMessage', async (msg) => {
            await MessageManager.createMsg(msg);
            socketServer.emit('messages', await MessageManager.getAll()); //emite a todos los clientes
        });

        socket.on('startTyping', (user) => {
            socket.broadcast.emit('startTyping', user);
        });

        socket.on('stopTyping', (user) => {
            socket.broadcast.emit('stopTyping')
        })
    })
}