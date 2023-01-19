import classes from '../css-components/MeetingDetailCard.module.css';

const MeetingDetailCard = (props) => {
    return(
        <div className={classes.fulldetailcard}>
            <div className={`${classes.detailcardaccent} ${props.className}`}></div>
            <div className={classes.detailcard}>
                {props.children}
            </div>

        </div>

    );
}

export default MeetingDetailCard;