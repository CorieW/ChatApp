module.exports = (socket, io) => {

    socket.on('send-message', (messageData) =>
    {
        // Send message to recipient client, using the recipient's client ID
        console.log(messageData)
        console.log("sending transmission " + messageData.to)
        io.sockets.connected[messageData.to.id].emit('new-message', {to: messageData.to, from: socket.user, message: messageData.message})
    })

}