import classes from '../css-components/DaysOfWeek.module.css';
import colors from '../css-components/Colors.module.css';

const DaysOfWeek = () => {
    
    return(
        <div className={classes.dayscontent}>
            <div className={`${classes.dayblock} ${colors.redblock}`}>
                <h2>Monday</h2>
            </div>
            <div className={`${classes.dayblock} ${colors.orangeblock}`}>
                <h2>Tuesday</h2>
            </div>
            <div className={`${classes.dayblock} ${colors.yellowblock}`}>
                <h2>Wednesday</h2>
            </div>
            <div className={`${classes.dayblock} ${colors.lightred}`}>
                <h2>Thursday</h2>
            </div>
            <div className={`${classes.dayblock} ${colors.lightorange}`}>
                <h2>Friday</h2>
            </div>
            <div className={`${classes.dayblock} ${colors.lightyellow}`}>
                <h2>Saturday</h2>
            </div>
            <div className={`${classes.dayblock} ${colors.lighterred}`}>
                <h2>Sunday</h2>
            </div>
        </div>
    );

}

export default DaysOfWeek;