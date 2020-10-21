module.exports = (socket, users) => {

    socket.on('req:users', () =>
    {
        socket.emit('res:users', users)
    })

}