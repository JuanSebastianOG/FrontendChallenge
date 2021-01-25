import React from 'react'
import '../css/UserCard.css'
import { Link } from 'react-router-dom';

//Display a user card based on the info sended as props
function UserCard({ name, email, imgsrc, idcustomer }) {
    return (
        <div className='usercard' data-testid="usercard" >
            <div className="usercard__header">
                <img src={imgsrc} alt="" />
            </div>
            <div className="usercard__body">
                <h1> {name} </h1>
                <h5> {email} </h5>
                <Link to={{ pathname: `/customerdata/${idcustomer}` }}>
                    <button ><span>SETTINGS</span></button>
                </Link>
            </div>
        </div>
    )
}

export default UserCard