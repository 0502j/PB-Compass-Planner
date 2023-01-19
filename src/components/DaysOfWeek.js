import classes from '../css-components/DaysOfWeek.module.css';

const DaysOfWeek = () => {
    
    return(
        <div className={classes.dayscontent}>
            <div className={`${classes.dayblock} ${classes.redblock}`}>
                <h2>Monday</h2>
            </div>
            <div className={`${classes.dayblock} ${classes.orangeblock}`}>
                <h2>Tuesday</h2>
            </div>
            <div className={`${classes.dayblock} ${classes.yellowblock}`}>
                <h2>Wednesday</h2>
            </div>
            <div className={`${classes.dayblock} ${classes.lightred}`}>
                <h2>Thursday</h2>
            </div>
            <div className={`${classes.dayblock} ${classes.lightorange}`}>
                <h2>Friday</h2>
            </div>
            <div className={`${classes.dayblock} ${classes.lightyellow}`}>
                <h2>Saturday</h2>
            </div>
            <div className={`${classes.dayblock} ${classes.lighterred}`}>
                <h2>Sunday</h2>
            </div>
        </div>
    );

}

export default DaysOfWeek;