import classes from '../css-components/Form.module.css';
import styles from '../css-components/AddMeeting.module.css';
import Input from '../components/Input';
import FormBtn from '../components/FormBtn';

const AddMeeting = () => {
    return(
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
    );
}

export default AddMeeting;