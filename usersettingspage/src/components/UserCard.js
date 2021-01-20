import React from 'react'
import '../css/UserCard.css'

function UserCard({name,email}) {
    return (
        <div className='usercard'>
            <div className="usercard__header">
                <img src="https://i.imgur.com/LMhM8nn.jpg" alt="" />
            </div>
            <div className="usercard__body">
                <h1>{name}</h1>
                <h5>{email}</h5>
                <button><span>SETTINGS</span></button>
            </div>
        </div>
    )
}

export default UserCard
