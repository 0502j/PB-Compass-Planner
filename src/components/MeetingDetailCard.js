import classes from '../css-components/MeetingDetailCard.module.css';
import styles from '../css-components/FormBtn.module.css';
import FormBtn from './FormBtn';

const MeetingDetailCard = (props) => {
    return(
        <div className={classes.fulldetailcard}>
            <div className={`${classes.detailcardaccent} ${props.className}`}></div>
            <div className={classes.detailcard}>
                {props.children}
                <FormBtn className={styles.deleteallbtn} type="button">Delete</FormBtn>
            </div>
        </div>

    );
}

export default MeetingDetailCard;