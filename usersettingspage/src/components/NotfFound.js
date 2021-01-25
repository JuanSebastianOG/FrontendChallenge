import { green } from '@material-ui/core/colors'
import React from 'react'
import { Link } from 'react-router-dom'

//When there is an no existing url
function NotfFound() {
    return (
        <div style={{ color: 'red', fontSize: 'xx-large',display:'flex',alignItems:'center',flexDirection:'column',marginTop:'50vh'}}>
            404-Not found!
            <Link to={{ pathname: '/' }}>
                <button className="settings__backbtn">
                    <span>BACK to Home page</span>
                </button>   
            </Link>
        </div>
    )
}

export default NotfFound
