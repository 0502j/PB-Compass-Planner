import { useEffect, useState } from 'react';
import classes from '../css-components/Header.module.css';

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
        </div>
    );
}

export default Header;