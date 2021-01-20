import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import '../css/Home.css'


function Home() {
    const [customers, setcustomers] = useState([])

    useEffect(() => {
        fetch('/api/v1/customerdata/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data.results)
                setcustomers(data.results)
            })
    }, [])
    return (
        <div className='home'>
            <h1>Our Customers</h1>

            <div className="home__userscontainer">
                {customers.map((customer, index) => (
                    <UserCard key={customer.id} name={customer.data.theme_name} email={customer.data.user_email} imgsrc={customer.data.user_profile_image}/>
                ))
                }

            </div>
        </div>
    )
}

export default Home
