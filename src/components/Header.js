import { Fragment, useEffect, useState } from 'react';
import classes from '../css-components/Header.module.css';
import compassLogo from '../img/compassLogo.svg';
import arrow from '../img/arrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../store/user-context';
import TemperatureLogo from '../img/TemperatureLogo.svg';

const Header = () => {

    //Fetch month name instead of number
    Date.prototype.getMonthName = function(){
        var monthNames = ["January", "February","March","April","May",
    "June","July","August", "September", "October", "November", "December"];

        return monthNames[this.getMonth()];
    }

    //Adding suffix on day number
    const suffix = (day) => {
        if(day>3 && day<21){
            return 'th';
        }
        switch(day%10){
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            case 4: return "th";
        }
    }

    //Update time every 1 minute
    const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0,-3));
    let month = new Date().getMonthName();
    let day = new Date().getDate();
    let year = new Date().getFullYear();
    let fulldate = month + " " + day + suffix(day) + ", " + year;

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(new Date().toLocaleTimeString().slice(0,-3));
            
        },60*1000);
        return () => {
            clearInterval(timer);
        }
    },[]);

    //Weather API fetching
    const [weatherData, setWeatherData] = useState();
    const [weatherIcon, setWeatherIcon] = useState();
    const KEY = process.env.REACT_APP_API_KEY;
   
    const weatherAPIData = async () => {     
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=${KEY}`)
        .then((response)=>response.json().then((data)=>{
            setWeatherData(data);
        }));
    }

    //displaying city & country name
    const data = window.localStorage.getItem("userdata");
    localStorage.setItem("userData", JSON.stringify(data));
    const parsedData = JSON.parse(data);
    const city = parsedData.enteredCity;
    const country = parsedData.enteredCountry;


    useEffect(()=>{
        weatherAPIData();
    },[]);
    
    //UseContext 
    const navigate = useNavigate();
    const {isLogged, setIsLogged} = useContext(AuthContext);
 
    useEffect(()=>{
        setIsLogged(localStorage.getItem("IsLoggedIn"));
    },[])

    useEffect(()=>{
        localStorage.setItem("IsLoggedIn", isLogged);
    })

    const logoutHandler = () => {
        localStorage.removeItem('IsLoggedIn');
        setIsLogged(false);
        // localStorage.setItem("IsLoggedIn", false);
        navigate('/login');
    }
    

    return(
        <div className={classes.mainct}>
            <div className={classes.headertitle}>
                <h2>Weekly Planner</h2>
                <p>Use this planner to organize your daily issues.</p>
            </div>

            <div className={classes.datetime}>
                    <h1>{time}</h1>
                    <p>{fulldate}</p>
            </div>

            <div className={classes.weatherdiv}>
                {weatherData && weatherData.weather.map((weather,id)=>{
                    return(
                        <div className={classes.fulltemperature}>
                        {city ? <h4>{city} - {country}</h4> : <h4>City not found.</h4>}
                        <div className={classes.temperature}>
                            <img src={TemperatureLogo}/>
                            <h1 key={id}>{weatherData.main?.temp.toFixed(0)}</h1>
                            <h1>º</h1>
                        </div>
                        </div>
                    );
                })}
                
            </div>

            <div className={classes.logoutdiv}>
                <div><a href="https://compass.uol/en/home/"><img src={compassLogo}/></a></div>
                <div className={classes.logoutcontent}>
                    <Link onClick={logoutHandler} to='/login'><img src={arrow}/></Link>
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    );
}

export default Header;