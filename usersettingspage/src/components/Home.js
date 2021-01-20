import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import '../css/Home.css'


function Home() {
    const [customers, setcustomers] = useState([])
    const [error, seterror] = useState(null)

    useEffect(() => {
        fetch('/api/v1/customerdata/')
            .then(res => {
                if(!res.ok){
                    throw Error('Can not fetch the data')
                }
                return res.json();
            })
            .then(data => {
                console.log(data.results);
                setcustomers(data.results);
            })
            .catch(e=>{
                console.log(e.message);
                seterror(e.message)
            })
    }, [])
    return (
        <div className='home'>
            <h1>Our Customers</h1>
            {error && <div> {error}</div>  }
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
