import React, { useState, useEffect } from 'react'
import UsersList from '../UsersList/UsersList';
import './Home.css'
import MessageBox from '../MessageBox/MessageBox';
import socket from '../../socket/socket'

export default function Home(props) {
    const [users, setUsers] = useState([])
    const [recipient, setRecipient] = useState(null)
    const [messageHistory, setMessageHistory] = useState([])

    useEffect(() =>
    { //! Doesn't update the users when someone's status changes. This is because their list elements don't change, but rather a attribute within them. (Do research into how to properly edit a list in a state)
        //! Strange things happen when server disconnects and client has already connected
        syncClientWithServer(props.userData)

        socket.on('server:sync', (clientData) =>
        {
            socket.user = clientData

            requestUsersFromServer()
            socket.on('res:users', (data) => 
            {
                setUsers(handleUserList(socket.user, data))
            })

            socket.on('broadcast:connection', data =>
            {
                // The below arrow function is used because without it, users isn't the updated state.
                setUsers((users) => [data, ...users])
            })

            socket.on('new-message', data =>
            {
                setMessageHistory((messageHistory) => [...messageHistory, data])
            })

            socket.on('broadcast:disconnection', data =>
            {
                setUsers(
                    (users) =>
                    {
                        let newArr = [...users]
                        users.forEach((updatedUser, index) =>
                        {
                            if (updatedUser.id === data.id) {
                                updatedUser.status = 'Offline'
                                newArr.splice(index, 1)
                                newArr.push(updatedUser)
                            }
                        })
                        return newArr
                    }
                )
            })
        });
    }, [])

    function syncClientWithServer(clientData)
    {  // Sends the client's data to the server - Must perform this to properly establish user
        socket.emit('client:sync', clientData);
    }

    function requestUsersFromServer()
    { // Sends a request to the server for all the users
        socket.emit('req:users')
    }

    function sendMessageToUser(to, message)
    { // Sends a message to a specific recipient
        socket.emit('send-message', {to: to, message: message})
    }

    function getMessagesFromUser(user)
    {
        let userMessages = []
        messageHistory.forEach((messageData) =>
        {
            console.log(user)
            console.log(messageData)
            if (messageData.from.id === user.id || messageData.to.id === user.id) {
                userMessages.push(messageData)
            }
        })
        return userMessages;
    }

    function handleUserList(user, users)
    { // Modifies the entered users list based on specific rules and criteria
        let newArr = []

        let busyIndex = 0;
        let awayIndex = 0;
        users.forEach((element, index) =>
        {
            if (element.id !== user.id)
            {
                if (element.status === 'Online') {
                    newArr.splice(0, 0, element)
                    busyIndex++
                    awayIndex++
                }
                else if (element.status === 'Busy') {
                    newArr.splice(awayIndex, 0, element)
                    awayIndex++
                }
                else if (element.status === 'Away') {
                    newArr.splice(busyIndex, 0, element)
                }
                else if (element.status === 'Offline') {
                    newArr.push(element)
                }
            }
        })

        return newArr;
    }

    if(recipient != null)
        return (
            <div className='container'>
                <UsersList users={users} setRecipient={setRecipient} />
                <MessageBox messageHistory={messageHistory} setMessageHistory={setMessageHistory} recipient={recipient} sendMessageToUser={sendMessageToUser} getMessagesFromUser={getMessagesFromUser} />
            </div>
        )
    else
        return (
            <div className='container'>
                <UsersList users={users} setRecipient={setRecipient} />
            </div>
        )
}

/* 
user: {
    id: String,
    name: String,
    status: String
}


messageData:
    message: String,
    to: {
        id: String,
        name: String,
        status: String
    }
    from: {
        id: String,
        name: String,
        status: String
    }
*/