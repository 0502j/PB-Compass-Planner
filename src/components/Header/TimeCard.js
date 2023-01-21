import classes from '../../css-components/TimeCard.module.css';

const TimeCard = (props) => {
    return(
        <div className={classes.cardcontent}>
            <div className={`${props.className} ${classes.timecard}`}>
                <h4>{props.children}</h4>
            </div>
        </div>
    );
}

export default TimeCard;