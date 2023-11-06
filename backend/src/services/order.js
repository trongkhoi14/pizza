class SocketService {
    // connection socket
    connection(socket) {
        socket.on('disconnect', () => {
            //console.log(`User disconnected with id is ${socket.id}`);
        })
        // event on here
        socket.on('new-order', msg => {
            //console.log(`msg is: ${msg}`)
            //_io.emit('new-order', msg)
        })

        socket.on('assign-order', msg => {
            //console.log(`msg is: ${msg}`)
            //_io.emit('assign-order', msg)
        })
    }
}

module.exports = new SocketService();