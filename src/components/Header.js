import { useEffect, useState } from 'react';
import classes from '../css-components/Header.module.css';
import compassLogo from '../img/compassLogo.svg';
import arrow from '../img/arrow.svg';

const Header = () => {

    //Fetch month name instead of number
    Date.prototype.getMonthName = function(){
        var monthNames = ["January", "February","March","April","May",
    "June","July","August", "September", "October", "November", "December"];

        return monthNames[this.getMonth()];
    }


   //Update time every 1 minute
   const [time, setTime] = useState(new Date().toLocaleTimeString().slice(0,-3));
   let month = new Date().getMonthName();
   let day = new Date().getDate();
   let year = new Date().getFullYear();
   
   let fulldate = month + " " + day + ", " + year;
  

    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(new Date().toLocaleTimeString().slice(0,-3));
            
        },60*1000);
        return () => {
            clearInterval(timer);
        }
    },[]);

    //Weather API fetching
    const [weather, setWeather] = useState();
    const KEY = process.env.REACT_APP_API_KEY;
   

    const weatherAPIData = async () => {     
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Pirassununga&appid=KEY")
        .then((response)=>response.json());

        setWeather(response);
    }

    useEffect(()=>{
        weatherAPIData();
        console.log(weather);
    },[]);
    
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
                <h3>Dummy weather text</h3>
            </div>

            <div className={classes.logoutdiv}>
                <div><img src={compassLogo}/></div>
                <div className={classes.logoutcontent}>
                    <img src={arrow}/>
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    );
}

export default Header;