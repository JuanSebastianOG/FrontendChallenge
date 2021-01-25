import React from 'react'
import UserCard from './UserCard'
import '../css/Home.css'
import useFetch from '../useFetch'
import {PuffLoader} from "react-spinners";
import { css } from "@emotion/core";

//Loading spinnner
const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;

function Home() {
    //Fethc users data to show in cards and chatch if ther is an error
    const { data: customers, error } = useFetch('/api/v1/customerdata/')

    
    return (
        <div className='home' data-testid="home-page">
            <h1>Our Customers</h1>
            {error && <div> {error}</div>}
            <div className="home__userscontainer">
                {customers?
                    customers.results.map((customer, index) => (
                        <UserCard key={customer.id} name={customer.data.theme_name} email={customer.data.user_email} imgsrc={customer.data.user_profile_image} idcustomer={customer.id} />
                    )):<PuffLoader color={'#16C79A'} loading={true} css={override} size={150} />
                }
            </div>
        </div>
    )
}

export default Home
