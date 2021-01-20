import React from 'react'
import UserCard from './UserCard'
import '../css/Home.css'
import useFetch from '../useFetch'


function Home() {
   const{data: customers,error}=useFetch('/api/v1/customerdata/')
   
    return (
        <div className='home'>
            <h1>Our Customers</h1>
            {error && <div> {error}</div>}
            <div className="home__userscontainer">
                {customers.map((customer, index) => (
                    <UserCard key={customer.id} name={customer.data.theme_name} email={customer.data.user_email} imgsrc={customer.data.user_profile_image} />
                ))
                }
            </div>
        </div>
    )
}

export default Home
