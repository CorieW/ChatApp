module.exports = (io) => {
    const users = []

    let currentUserID = 0

    io.on('connection', (socket, userData) =>
    {
        socket.on('client:sync', (data) =>
        {
            socket.user = { id: socket.id, name: data.username, status: 'Online' }
            users.push(socket.user)
            broadcastNewConnection(socket)

            syncClientWithServer(socket)
    
            require('./users')(socket, users)
            require('./message')(socket, io)
            require('./disconnection')(socket, io)
        })
    })

    function broadcastNewConnection(socket)
    {
        socket.broadcast.emit('broadcast:connection', socket.user)
    }

    function syncClientWithServer(socket)
    {
        socket.emit('server:sync', socket.user)
    }

}