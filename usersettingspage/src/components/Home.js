import React from 'react'
import UserCard from './UserCard'
import '../css/Home.css'
function Home() {

    return (
        <div className='home'>
            <h1>Our Customers</h1>
            <div className="home__userscontainer">
                <UserCard name={'Obama'} email={"gmail.com"}/>
            </div>
        </div>
    )
}

export default Home
