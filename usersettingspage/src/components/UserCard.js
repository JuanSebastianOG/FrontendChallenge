import React from 'react'
import '../css/UserCard.css'

function UserCard({name,email,imgsrc}) {
    return (
        <div className='usercard'>
            <div className="usercard__header">
                <img src={imgsrc} alt="" />
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
