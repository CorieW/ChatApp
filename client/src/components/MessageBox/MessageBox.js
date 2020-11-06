import React, { useState, useEffect } from 'react'
import './MessageBox.css'
import getStatusColor from '../../utils/StatusColor'

export default function MessageBox(props)
{
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() =>
    {
        console.log(props.recipient)
        setMessages(props.getMessagesFromUser(props.recipient))
    }, [props.messageHistory, props.recipient])

    function handleMessageSubmit(e)
    {
        e.preventDefault()

        setMessage('')

        props.setMessageHistory([...props.messageHistory, {to: props.recipient, from: {name: 'you'}, message: message}])
        props.sendMessageToUser(props.recipient, message)
    }

    function handleMessageChange(e)
    {
        setMessage(e.target.value)
    }

    return (
        <div className='message-box'>
            <div className='message-box-header'>
                <i className='fas fa-circle status-icon' style={{ color: getStatusColor(props.recipient.status) }} ></i>
                <p className='recipient'>{props.recipient.name}</p>
            </div>
            <div className='messages'>
                {messages.map((messageData) =>
                {
                    return (
                        <div className='message recipient-message'>
                            <p className='message-username'>{messageData.from.name}</p>
                            <p className='message-text'>{messageData.message}</p>
                        </div> 
                    )
                })}
            </div>
            <form onSubmit={handleMessageSubmit}>
                <textarea className='message-input' name='messageInput' placeholder='Message' onChange={handleMessageChange} value={message}/>
                <button className='send-message' type='submit'>SEND</button>
            </form>
        </div>
    )
}
