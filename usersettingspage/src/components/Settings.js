import React, { useEffect, useState } from 'react'
import '../css/Settings.css'
import { Link, useHistory } from "react-router-dom";
import useFetch from '../useFetch';
import LeftInfo from './LeftInfo';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";

const override = css`
  display: flex;
  margin: 0 auto;
  border-color: red;
`;
//Styles for formControl of Material UI
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));
//Styles for Checkbox of Material UI
const StyledCheckbox = withStyles({
    root: {
        color: "#11698E",
        '&$checked': {
            color: "#11698E",
            fontStyle: 'bold',

        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

/* eslint-disable */
function Settings() {
    const classes = useStyles();
    //Cant features enabled
    const [numfeatures, setnumfeatures] = useState(0)
    //State for buttton submit
    const [allowed, setallowed] = useState(false)

    //State values for enabled features
    const [ceinge, setceinge] = useState(false)
    const [inbata, setinbata] = useState(false)
    const [encose, setencose] = useState(false)
    const [encodi, setencodi] = useState(false)
    const [endase, setendase] = useState(false)
    const [ened, setened] = useState(false)


    //State value email validation
    const [email, setemail] = useState('')
    const [emailError, setEmailError] = useState('');
    const handleEmailChange = (event) => {
        var validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (event.target.value.length > 0) {
            validEmailRegex.test(event.target.value) ? setallowed(false) : setallowed(true)
            setEmailError(validEmailRegex.test(event.target.value) ? '' : 'Ivalid email')

        } else {
            setEmailError('')
            setallowed(false)
        }

        setemail(event.target.value)
    };
    //State value time validation
    const [time, setTime] = useState('')
    const [timeError, setTimeError] = useState('');
    const handleTimeChange = (event) => {
        if (event.target.value.length > 0) {
            if (timezones) {
                var found = timezones.find(element => element.localeCompare(event.target.value) === 0);
                if (found) {
                    setTimeError(false)
                    setallowed(false)
                }
                else {
                    setallowed(true)
                    setTimeError('Invalid timezone')
                }
            }
        } else {
            setTimeError('')
            setallowed(false)
        }
        setTime(event.target.value)
    };

    //Max number of features validation
    const errors = [ceinge, inbata, encose, encodi, endase, ened].filter((v) => v).length > numfeatures

    //Changes on checkboxes
    const handleChange = (event) => {
        switch (event.target.name) {
            case 'ceinge':
                setceinge(event.target.checked)
                break;
            case 'inbata':
                setinbata(event.target.checked)
                break;
            case 'encose':
                setencose(event.target.checked)
                break;
            case 'encodi':
                setencodi(event.target.checked)
                break;
            case 'endase':
                setendase(event.target.checked)
                break;
            case 'ened':
                setened(event.target.checked)
                break;
            default:
                break;
        }
    };
    //History for extract the link and make the fetch
    const history = useHistory();
    const link = '/api/v1' + history.location.pathname;
    const { data: customerData, error } = useFetch(link)

    //Fetch time zones for the search select 
    const { data: timezones } = useFetch('http://worldtimeapi.org/api/timezonee')


    //Themes for select if customer wants to edit
    const themes = ['Simply Fabulous', 'Tropical Island', 'Safari', 'Tranquility', 'Mustache Bash', 'Candy Crush', 'Garden Party']
    const [theme, settheme] = useState('')
    const handleThemeChange = (event) => {
        settheme(themes[event.target.value])
    };
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    //Languages for select if customer wants to edit
    const languagesarr = ["Chinese", "Italian", "English", "Spanish", "French", "German"]
    const [language, setlanguage] = useState('')
    const handleLanguageChange = (event) => {
        setlanguage(getKeyByValue(languages, languagesarr[event.target.value]))
    };
    //Dictionary for store only the code
    var languages = {
        zh: "Chinese",
        it: "Italian",
        en: "English",
        sp: "Spanish",
        fr: "French",
        de: "German"
    };

    const handleUpdateClick = (event) => {
        console.log(email, theme, time, language, ceinge, endase, inbata, ened, encodi, encose)
        var banner = document.getElementById('textarea').innerHTML;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    data: {
                        SUBSCRIPTION: customerData.data.SUBSCRIPTION,
                        CREATION_DATE: customerData.data.CREATION_DATE,
                        LAST_PAYMENT_DATE: customerData.data.LAST_PAYMENT_DATE,
                        theme_name: theme ? theme : customerData.data.theme_name,
                        ENABLED_FEATURES: {
                            CERTIFICATES_INSTRUCTOR_GENERATION: ceinge,
                            INSTRUCTOR_BACKGROUND_TASKS: inbata,
                            ENABLE_COURSEWARE_SEARCH: encose,
                            ENABLE_COURSE_DISCOVERY: encodi,
                            ENABLE_DASHBOARD_SEARCH: endase,
                            ENABLE_EDXNOTES: ened,
                        },
                        language_code: language ? language : customerData.data.language_code,
                        banner_message: banner,
                        displayed_timezone: time ? time : customerData.data.displayed_timezone,
                        user_profile_image: customerData.data.user_profile_image,
                        user_email: email ? email : customerData.data.user_email,
                    }
                }
            )
        };
        console.log(requestOptions.body)
        fetch(link + '/', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };


    //Get and set the data related to features checkboxes and max cant of features when change customerData
    useEffect(() => {
        var features = {
            "free": 1,
            "basic": 3,
            "premium": 6,
        };
        if (customerData) {
            const { ENABLED_FEATURES, SUBSCRIPTION } = customerData.data;
            const { CERTIFICATES_INSTRUCTOR_GENERATION, ENABLE_COURSEWARE_SEARCH,
                ENABLE_COURSE_DISCOVERY, ENABLE_DASHBOARD_SEARCH,
                ENABLE_EDXNOTES, INSTRUCTOR_BACKGROUND_TASKS } = ENABLED_FEATURES;

            setceinge(CERTIFICATES_INSTRUCTOR_GENERATION)
            setinbata(INSTRUCTOR_BACKGROUND_TASKS)
            setencose(ENABLE_COURSEWARE_SEARCH)
            setencodi(ENABLE_COURSE_DISCOVERY)
            setendase(ENABLE_DASHBOARD_SEARCH)
            setened(ENABLE_EDXNOTES)

            setnumfeatures(features[SUBSCRIPTION])
        }
    }, [customerData])

    //If the data is loaded render the full component
    if (customerData && timezones) {
        return (
            <div className='settings' data-testid="settings">
                 <Link to={{ pathname: '/' }}>
                <button className="settings__backbtn">
                    <span>BACK</span> 
                </button>
                </Link>
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
                    <div dangerouslySetInnerHTML={{ __html: customerData.data.banner_message }} contentEditable="true" id='textarea' suppressContentEditableWarning={true} className='settings__rightbarTextarea'>
                    </div>

                    <div className="settings__rightbarTextInputFields">

                        <label htmlFor="email">EMAIL: <span>{customerData.data.user_email}</span></label>
                        <input type="email" onChange={handleEmailChange} placeholder="Change email" id="lname" name="lname" />

                        <label htmlFor="timezone">TIME ZONE: <span>{customerData.data.displayed_timezone}</span> </label>
                        <input list="brow" onChange={handleTimeChange} />
                        <datalist id="brow">
                            {
                                timezones && timezones.map((time) => <option key={time}>{time}</option>)
                            }
                        </datalist>

                        <label htmlFor="language">LANGUAGE: <span>{languages[customerData.data.language_code]}</span> </label>
                        <select onChange={handleLanguageChange} id="themename">
                            <option defaultValue="selected">Change language</option>
                            {
                                languagesarr.map((language, key) => <option value={key} key={language}>{language}</option>)
                            }
                        </select>
                        <label htmlFor="themename">THEME NAME:  <span>{customerData.data.theme_name}</span></label>
                        <select onChange={handleThemeChange} id="themename">
                            <option defaultValue="selected">Change theme</option>
                            {
                                themes.map((module, key) => <option value={key} key={module}>{module}</option>)
                            }
                        </select>
                    </div>
                    {emailError.length > 0 &&
                        <span className='alert'><span>&#9888; </span>{emailError}</span>}
                    {timeError.length > 0 &&
                        <span className='alert'><span>&#9888; </span>{timeError}</span>}
                    <label>CHOOSE YOUR ENABLED FEATURES:</label>
                    {errors && <h5 className="alert"><span>&#9888; </span>Too many features. Max: {numfeatures} for {customerData.data.SUBSCRIPTION} subscription</h5>}

                    <div className="settings__rightbarTextInputFieldsCheck">
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<StyledCheckbox checked={ceinge} onChange={handleChange} name="ceinge" />}
                                    label="Certificates instructor generation"
                                    color=''
                                />
                                <FormControlLabel
                                    control={<StyledCheckbox checked={inbata} onChange={handleChange} name="inbata" />}
                                    label="Instructor background tasks"
                                />
                                <FormControlLabel
                                    control={<StyledCheckbox checked={encodi} onChange={handleChange} name="encodi" />}
                                    label="Enable courseware discovery"
                                />
                            </FormGroup>
                        </FormControl>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<StyledCheckbox checked={endase} onChange={handleChange} name="endase" />}
                                    label="Enable dashboard search"
                                />
                                <FormControlLabel
                                    control={<StyledCheckbox checked={ened} onChange={handleChange} name="ened" />}
                                    label="Enable edxnotes"
                                />
                                <FormControlLabel
                                    control={<StyledCheckbox checked={encose} onChange={handleChange} name="encose" />}
                                    label="Enable courseware search"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>

                    <button onClick={handleUpdateClick} disabled={errors || allowed || timeError}><span>EDIT</span></button>

                </div>

            </div>
        )
    } else {
        //If data failed or is loading
        return (
            <div className="check" data-testid="loading" >
                {error ? <div> {error}</div> :<PuffLoader color={'#16C79A'} loading={true} css={override} size={150} />}
            </div>

        )
    }
}


export default Settings
