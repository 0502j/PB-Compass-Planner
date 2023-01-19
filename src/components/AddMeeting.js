import classes from '../css-components/Form.module.css';
import styles from '../css-components/AddMeeting.module.css';
import colors from '../css-components/Colors.module.css';
import Input from '../components/Input';
import FormBtn from '../components/FormBtn';
import TimeCard from './TimeCard';
import { Fragment } from 'react';
import DaysOfWeek from '../components/DaysOfWeek';
import MeetingDetailCard from './MeetingDetailCard';

const AddMeeting = () => {
    return(
        <Fragment>
                <div className={classes.taskaddingdiv}>
                <Input className={`${classes.taskinput} ${classes.tasknameinput}`} type="text" id="taskname" placeholder="Task or issue"/>
                <select className={`${classes.taskinput} ${classes.taskdayinput}`}>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                </select>
                <select className={`${classes.taskinput} ${classes.taskdateinput}`}>
                    <option>07:00</option>
                    <option>07:30</option>
                    <option>08:00</option>
                    <option>08:30</option>
                    <option>09:00</option>
                    <option>09:30</option>
                    <option>10:00</option>
                    <option>10:30</option>
                </select>
                <div className={styles.addtaskbuttons}>
                    <FormBtn type="submit" className={`${styles.taskbtn} ${styles.addtaskbtn}`}>+ Add to calendar</FormBtn>
                    <FormBtn type="submit" className={`${styles.taskbtn} ${styles.deletealltasksbtn}`}>- Delete All</FormBtn>
                </div>
            </div>

            <DaysOfWeek/>
            <TimeCard className={styles.timecard}>Time</TimeCard>
            <div className={styles.addedtasksdiv}>
            <TimeCard className={styles.timecard}>10:30</TimeCard>
                <MeetingDetailCard className={colors.lighterred}>Lorem ipsum dolor sit amet</MeetingDetailCard>
            </div>
            
        </Fragment>
    );
}

export default AddMeeting;