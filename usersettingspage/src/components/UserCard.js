import React from 'react'
import '../css/UserCard.css'

function UserCard() {
    return (
        <div className='usercard'>
            <div className="usercard__header">
                <img src="https://i.imgur.com/LMhM8nn.jpg" alt="" />
            </div>
            <div className="usercard__body">
                <h1>Super Obamas</h1>
                <h5>gmail@hotmail.com</h5>
                <button><span>SETTINGS</span></button>
            </div>
        </div>
    )
}

export default UserCard
