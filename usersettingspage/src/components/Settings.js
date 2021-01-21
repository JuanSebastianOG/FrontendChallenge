import React, { useEffect, useState } from 'react'
import '../css/Settings.css'
import { useHistory } from "react-router-dom";
import useFetch from '../useFetch';
import LeftInfo from './LeftInfo';

function Settings() {
    const history = useHistory();
    const themes = ['Simply Fabulous', 'Tropical Island', 'Safari', 'Tranquility', 'Mustache Bash', 'Candy Crush', 'Garden Party']

    const themesSelect = themes.map(Add => Add)
    const link = '/api/v1' + history.location.pathname;
    const { data: customerData, error } = useFetch(link)
    
    var languages = {
        zh: "Chinese",
        it: "Italian",
        en: "English",
        sp: "Spanish",
        fr: "French",
        de: "German",
    };
    console.log(customerData)

    if (customerData) {
        return (
            <div className='settings'>

                <div className="settings__leftbar">
                    <h1 >SETTINGS</h1>
                    <img src={customerData.data.user_profile_image} alt="" />
                    <div className="settings__leftbarMiddle">
                        <LeftInfo subscription={customerData.data.SUBSCRIPTION} creationdate={customerData.data.CREATION_DATE} lastpayment={customerData.data.LAST_PAYMENT_DATE} />
                    </div>
                    <div className="settings__leftbarBottom">
                        <img alt='' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0xMy4xMiAyNGgtMi4yNGMtLjc1NyAwLTEuMzk2LS41NjctMS40ODYtMS4zMmwtLjIzOS0xLjg3NmMtLjQ3Ny0uMTU1LS45MzctLjM0Ni0xLjM3NC0uNTY5bC0xLjQ5NCAxLjE2MWMtLjYwNi40NjktMS40NTkuNDE1LTEuOTg1LS4xMjZsLTEuNTc1LTEuNTc1Yy0uNTM3LS41MjEtLjU5MS0xLjM3NC0uMTIyLTEuOTc5bDEuMTYxLTEuNDk1Yy0uMjI0LS40MzctLjQxNS0uODk3LS41NjktMS4zNzRsLTEuODgtLjIzOWMtLjc1LS4wOTItMS4zMTctLjczMS0xLjMxNy0xLjQ4OHYtMi4yNGMwLS43NTcuNTY3LTEuMzk2IDEuMzItMS40ODZsMS44NzYtLjIzOWMuMTU1LS40NzcuMzQ2LS45MzcuNTY5LTEuMzc0bC0xLjE2LTEuNDk0Yy0uNDctLjYwNi0uNDE1LTEuNDYuMTI3LTEuOTg2bDEuNTc1LTEuNTc1Yy41MjEtLjUzNyAxLjM3NS0uNTkgMS45NzktLjEyMmwxLjQ5NCAxLjE2MmMuNDM3LS4yMjMuODk3LS40MTQgMS4zNzUtLjU2OWwuMjM5LTEuODhjLjA5LS43NS43MjktMS4zMTcgMS40ODYtMS4zMTdoMi4yNGMuNzU3IDAgMS4zOTYuNTY3IDEuNDg2IDEuMzJsLjIzOSAxLjg3NmMuNDc4LjE1NS45MzguMzQ2IDEuMzc1LjU2OWwxLjQ5NC0xLjE2MWMuNjA3LS40NjkgMS40NTktLjQxNSAxLjk4NS4xMjdsMS41NzUgMS41NzVjLjUzNy41MjEuNTkxIDEuMzc0LjEyMiAxLjk3OWwtMS4xNjEgMS40OTVjLjIyNC40MzcuNDE1Ljg5Ny41NjkgMS4zNzRsMS44OC4yMzljLjc0OS4wOTEgMS4zMTYuNzMgMS4zMTYgMS40ODd2Mi4yNGMwIC43NTctLjU2NyAxLjM5Ni0xLjMyIDEuNDg2bC0xLjg3Ni4yMzljLS4xNTUuNDc3LS4zNDYuOTM3LS41NjkgMS4zNzRsMS4xNjEgMS40OTRjLjQ3LjYwNi40MTUgMS40NTktLjEyNyAxLjk4NWwtMS41NzUgMS41NzVjLS41MjEuNTM3LTEuMzc1LjU5Mi0xLjk3OS4xMjJsLTEuNDk1LTEuMTYxYy0uNDM3LjIyNC0uODk3LjQxNS0xLjM3NC41NjlsLS4yMzkgMS44OGMtLjA5MS43NS0uNzMgMS4zMTctMS40ODcgMS4zMTd6bS01LjM5LTQuODZjLjA4MyAwIC4xNjguMDIxLjI0NC4wNjMuNTUxLjMwOCAxLjE0OC41NTYgMS43NzQuNzM2LjE5Mi4wNTUuMzMzLjIxOS4zNTguNDE3bC4yOCAyLjJjLjAzLjI1MS4yNDcuNDQ0LjQ5NC40NDRoMi4yNGMuMjQ3IDAgLjQ2NC0uMTkzLjQ5My0uNDM5bC4yODEtMi4yMDRjLjAyNS0uMTk4LjE2Ni0uMzYyLjM1OC0uNDE3LjYyNi0uMTggMS4yMjMtLjQyOCAxLjc3NC0uNzM2LjE3NS0uMDk4LjM5My0uMDgxLjU1LjA0MmwxLjc1IDEuMzZjLjIwMS4xNTYuNDgzLjE0My42NTUtLjAzNGwxLjU4NS0xLjU4NWMuMTgxLS4xNzYuMTk1LS40NTguMDM5LS42NmwtMS4zNi0xLjc1Yy0uMTIzLS4xNTgtLjE0LS4zNzUtLjA0Mi0uNTUuMzA4LS41NTEuNTU2LTEuMTQ4LjczNi0xLjc3NC4wNTUtLjE5Mi4yMTktLjMzMy40MTctLjM1OGwyLjItLjI4Yy4yNTEtLjAzMS40NDQtLjI0OC40NDQtLjQ5NXYtMi4yNGMwLS4yNDctLjE5My0uNDY0LS40MzktLjQ5M2wtMi4yMDQtLjI4MWMtLjE5OC0uMDI1LS4zNjItLjE2Ni0uNDE3LS4zNTgtLjE4LS42MjYtLjQyOC0xLjIyMy0uNzM2LTEuNzc0LS4wOTgtLjE3NS0uMDgyLS4zOTIuMDQyLS41NWwxLjM2LTEuNzVjLjE1Ny0uMjAyLjE0My0uNDg0LS4wMzMtLjY1NGwtMS41ODUtMS41ODVjLS4xNzUtLjE4Mi0uNDU4LS4xOTYtLjY2LS4wMzlsLTEuNzUgMS4zNmMtLjE1OS4xMjMtLjM3Ni4xNC0uNTUxLjA0Mi0uNTQ5LS4zMDgtMS4xNDYtLjU1NS0xLjc3NC0uNzM2LS4xOTItLjA1NS0uMzMzLS4yMTktLjM1OC0uNDE3bC0uMjgtMi4yYy0uMDMxLS4yNTItLjI0OC0uNDQ1LS40OTUtLjQ0NWgtMi4yNGMtLjI0NyAwLS40NjQuMTkzLS40OTMuNDM5bC0uMjgxIDIuMjA0Yy0uMDI1LjE5OC0uMTY2LjM2Mi0uMzU4LjQxOC0uNjI4LjE4LTEuMjI1LjQyOC0xLjc3NC43MzUtLjE3NS4wOTktLjM5Mi4wODEtLjU1MS0uMDQxbC0xLjc1LTEuMzZjLS4yMDItLjE1Ny0uNDgzLS4xNDMtLjY1NC4wMzNsLTEuNTg1IDEuNTg2Yy0uMTgxLjE3Ni0uMTk1LjQ1OC0uMDM5LjY2bDEuMzYgMS43NWMuMTIzLjE1OC4xNC4zNzUuMDQyLjU1LS4zMDkuNTUxLS41NTYgMS4xNDgtLjczNiAxLjc3NC0uMDU1LjE5Mi0uMjE5LjMzMy0uNDE3LjM1OGwtMi4yLjI4Yy0uMjUxLjAzLS40NDQuMjQ3LS40NDQuNDk0djIuMjRjMCAuMjQ3LjE5My40NjQuNDM5LjQ5M2wyLjIwNC4yODFjLjE5OC4wMjUuMzYyLjE2Ni40MTcuMzU4LjE4LjYyNi40MjggMS4yMjMuNzM2IDEuNzc0LjA5OC4xNzUuMDgyLjM5Mi0uMDQyLjU1bC0xLjM2IDEuNzVjLS4xNTcuMjAyLS4xNDMuNDg0LjAzMy42NTRsMS41ODUgMS41ODVjLjE3NS4xODEuNDU2LjE5NS42Ni4wMzlsMS43NS0xLjM2Yy4wOTEtLjA2OC4xOTktLjEwNC4zMDgtLjEwNHoiIGZpbGw9IiNmOGYxZjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgMTdjLTIuNzU3IDAtNS0yLjI0My01LTVzMi4yNDMtNSA1LTUgNSAyLjI0MyA1IDUtMi4yNDMgNS01IDV6bTAtOWMtMi4yMDYgMC00IDEuNzk0LTQgNHMxLjc5NCA0IDQgNCA0LTEuNzk0IDQtNC0xLjc5NC00LTQtNHoiIGZpbGw9IiNmOGYxZjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" />
                    </div>
                </div>
                <div className="settings__rightbar">
                    <label htmlFor='text'>BANNER MESSAGE:</label>
                    <div dangerouslySetInnerHTML={{ __html: customerData.data.banner_message }} contentEditable="true" suppressContentEditableWarning={true} className='settings__rightbarTextarea'>
                    </div>

                    <div className="settings__rightbarTextInputFields">

                        <label htmlFor="email">EMAIL: <span>{customerData.data.user_email}</span></label>
                        <input type="email" placeholder="Change email" id="lname" name="lname" />
                        <label htmlFor="themename">THEME NAME:  <span>{customerData.data.theme_name}</span></label>
                        <select id="themename">
                            <option defaultValue="selected">Change theme</option>
                            {
                                themesSelect.map((module, key) => <option value={key} key={module}>{module}</option>)
                            }
                        </select>
                        <label htmlFor="timezone">TIME ZONE: <span>{customerData.data.displayed_timezone}</span> </label>
                        <input list="brow" />
                        <datalist id="brow">
                            <option defaultValue="Internet Explorer" />
                            <option defaultValue="Firefox" />
                            <option defaultValue="Chrome" />
                            <option defaultValue="Opera" />
                            <option defaultValue="Safari" />
                        </datalist>
                        <label htmlFor="language">LANGUAGE: <span>{languages[customerData.data.language_code]}</span> </label>
                        <select>

                        </select>
                    </div>
                    <label>CHOOSE YOUR ENABLED FEATURES:</label>

                    <div className="settings__rightbarTextInputFieldsCheck">
                        <div>
                            <input type="checkbox" id="horns" name="horns" />
                            <label htmlFor="cinge">Certificates instructor generation</label>
                        </div>
                        <div>
                            <input type="checkbox" id="horns" name="horns" />
                            <label htmlFor="inbsts">Instructor background tasks</label>
                        </div>
                        <div>
                            <input type="checkbox" id="horns" name="horns" />
                            <label htmlFor="encose">Enable courseware search</label>
                        </div>
                        <div>
                            <input type="checkbox" id="horns" name="horns" />
                            <label htmlFor="encodi">Enable courseware discovery</label>
                        </div>
                        <div>
                            <input type="checkbox" id="horns" name="horns" />
                            <label htmlFor="endase">Enable dashboard search</label>
                        </div>
                        <div>
                            <input type="checkbox" id="horns" name="horns" />
                            <label htmlFor="horns">Enable edxnotes</label>
                        </div>
                    </div>

                    <button><span>EDIT</span></button>

                </div>

            </div>
        )
    } else {
        return (
            <div className="check">

                {error ? <div> {error}</div> : <div>Loading..</div>}

            </div>

        )
    }
}

export default Settings
