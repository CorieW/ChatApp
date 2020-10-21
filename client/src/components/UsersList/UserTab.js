import React from 'react'
import getStatusColor from '../../utils/StatusColor'

export default function UserTab(props) {
    return (
        <div className='user-tab' onClick={() => props.setRecipient(props.user)}>
            <i className='fas fa-circle status-icon' style={{ color: getStatusColor(props.user.status) }} ></i>
            <p className='username'>{props.user.name}</p>
        </div>
    )
}
