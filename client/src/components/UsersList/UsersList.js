import React, { useState, useEffect } from 'react'
import './UsersList.css'
import UserTab from './UserTab';

export default function UsersList(props) {
    const [users, setUsers] = useState([])

    return (
        <div className='users-list'>
            {props.users.map((user) =>
            {
                return (
                    <UserTab user={user} setRecipient={props.setRecipient} />
                )
            })}
        </div>
    )
}
