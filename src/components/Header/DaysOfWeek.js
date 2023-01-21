import classes from '../../css-components/DaysOfWeek.module.css';

const DaysOfWeek = (props) => {
    
    return(
        <div className={classes.dayscontent}>
            <div onClick={props.onClick} id={props.id} className={`${classes.dayblock} ${props.className}`}>
                {props.children}
            </div>
        </div>
    );

}

export default DaysOfWeek;