module.exports = (socket, io) => {

    socket.on('disconnect', () =>
    {
        socket.user.status = 'Offline'
        socket.broadcast.emit('broadcast:disconnection', socket.user)
    })

}