import { Fragment, useState } from 'react';
import classes from '../../css-components/Form.module.css';
import styles from '../../css-components/AddMeeting.module.css';
import btnstyles from '../../css-components/FormBtn.module.css';
import colors from '../../css-components/Colors.module.css';
import Input from '../Forms/Input';
import FormBtn from '../Forms/FormBtn';
import TimeCard from '../Header/TimeCard';
import DaysOfWeek from '../Header/DaysOfWeek';
import MeetingDetailCard from './MeetingDetailCard';
import ConfirmDeletion from '../UI/ConfirmDeletion';

const AddMeeting = () => {

    const [taskInput, setTaskInput] = useState({
        id:'',
        enteredTaskName:'',
        enteredTaskDay:'',
        enteredTaskTime:''
    });

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const addTask = () => {

        if(taskInput.enteredTaskDay === '' ||
        taskInput.enteredTaskTime === ''){
            alert("Task information invalid. Please try again!");
        }
        else{
            setTaskInput({
                ...taskInput,
                id: tasks.length+1,
            });
    
            setTasks(prevTasks =>
                [...prevTasks, taskInput]
            );
            
        }

    }

    //Getting all user input
    const taskNameChangeHandler = (event) => {
        setTaskInput({
            ...taskInput,
            enteredTaskName: event.target.value
        })
    };

    const taskDayChangeHandler = (event) => {
        setTaskInput({
            ...taskInput,
            enteredTaskDay: event.target.value
        })
    };

    const taskTimeChangeHandler = (event) => {
        setTaskInput({
            ...taskInput,
            enteredTaskTime: event.target.value
        })
    };

    //Removing single or all tasks at once
    const removeAllTasks = () => {
        setTasks([]);
        setFilteredTasks([]);
        setShowModal(false);
    }

    const deleteOneTask = (id) => {
        setTasks(tasks.filter((info) => info.id !== id));
    }

    //Confirm Deletion modal
    const modalClose = () => {
        setShowModal(false);
    }

    const modalOpen = () => {
        setShowModal(true);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    //Week days validation & class control
    const [isMondaySelected, setIsMondaySelected] = useState(false);
    const [isTuesdaySelected, setIsTuesdaySelected] = useState(false);
    const [isWednesdaySelected, setIsWednesdaySelected] = useState(false);
    const [isThursdaySelected, setIsThursdaySelected] = useState(false);
    const [isFridaySelected, setIsFridaySelected] = useState(false);
    const [isSaturdaySelected, setIsSaturdaySelected] = useState(false);
    const [isSundaySelected, setIsSundaySelected] = useState(false);

    let DayClasses = (
        isMondaySelected ? colors['redblock'] : 
        isTuesdaySelected ? colors['orangeblock'] : 
        isWednesdaySelected ? colors['yellowblock'] :
        isThursdaySelected ? colors['lightred'] :
        isFridaySelected ? colors['lightorange'] :
        isSaturdaySelected ? colors['lightyellow'] :
        isSundaySelected ? colors['lighterred'] : ''
    )
          

    const WeekDaysHandler = (event) => {

        setIsMondaySelected(false);
        setIsTuesdaySelected(false);
        setIsWednesdaySelected(false);
        setIsThursdaySelected(false);
        setIsFridaySelected(false);
        setIsSaturdaySelected(false);
        setIsSundaySelected(false);
        
        if(event.currentTarget.id === "Monday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Monday'));
            setIsMondaySelected(true);
        }

        if(event.currentTarget.id === "Tuesday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Tuesday'));
            setIsTuesdaySelected(true);
        }
        

        if(event.currentTarget.id === "Wednesday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Wednesday'));
            setIsWednesdaySelected(true);
        }

        if(event.currentTarget.id === "Thursday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Thursday'));
            setIsThursdaySelected(true);
        }

        
        if(event.currentTarget.id === "Friday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Friday'));
            setIsFridaySelected(true);
        }

        if(event.currentTarget.id === "Saturday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Saturday'));
            setIsSaturdaySelected(true);
        }

        if(event.currentTarget.id === "Sunday"){
            setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === 'Sunday'));
            setIsSundaySelected(true);
        }
        
        
    }


    return(
        <Fragment>
    

            {showModal &&
                <ConfirmDeletion>
                    <h3>Are you sure you want to delete all tasks?</h3>
                    <h3>This cannot be undone!</h3>
                    <div className={styles.confirmdeletion}>
                        <FormBtn  className={`${classes.confirminputs} ${classes.confirm}`} onClick={removeAllTasks}>Delete</FormBtn>
                        <FormBtn className={`${classes.confirminputs} ${classes.cancel}`} onClick={modalClose}>Cancel</FormBtn>
                    </div>
                </ConfirmDeletion>
        }
            
            <form onSubmit={submitHandler}>
                <div className={classes.taskaddingdiv}>
                    <Input onChange={taskNameChangeHandler} className={`${classes.taskinput} ${classes.tasknameinput}`} type="text" id="taskname" placeholder="Task or issue"/>
                    <select onChange={taskDayChangeHandler} className={`${classes.taskinput} ${classes.taskdayinput}`}>
                        <option selected disabled>Task day</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>

                    <Input onChange={taskTimeChangeHandler} className={`${classes.taskinput} ${classes.taskdateinput}`} type="time"></Input>

                    <div className={styles.addtaskbuttons}>
                        <FormBtn onClick={addTask} type="submit" className={`${styles.taskbtn} ${styles.addtaskbtn}`}>+ Add to calendar</FormBtn>
                        <FormBtn onClick={modalOpen} type="submit" className={`${styles.taskbtn} ${styles.deletealltasksbtn}`}>- Delete All</FormBtn>
                    </div>
                </div>
            </form>

            <div className={styles.weekdaysdiv}>
            <DaysOfWeek onClick={WeekDaysHandler} id="Monday" className={`${classes.dayblock} ${colors.redblock}`}>Monday</DaysOfWeek>
            <DaysOfWeek onClick={WeekDaysHandler} id="Tuesday" className={`${classes.dayblock} ${colors.orangeblock}`}>Tuesday</DaysOfWeek>
            <DaysOfWeek onClick={WeekDaysHandler} id="Wednesday" className={`${classes.dayblock} ${colors.yellowblock}`}>Wednesday</DaysOfWeek>
            <DaysOfWeek onClick={WeekDaysHandler} id="Thursday" className={`${classes.dayblock} ${colors.lightred}`}>Thursday</DaysOfWeek>
            <DaysOfWeek onClick={WeekDaysHandler} id="Friday" className={`${classes.dayblock} ${colors.lightorange}`}>Friday</DaysOfWeek>
            <DaysOfWeek onClick={WeekDaysHandler} id="Saturday" className={`${classes.dayblock} ${colors.lightyellow}`}>Saturday</DaysOfWeek>
            <DaysOfWeek onClick={WeekDaysHandler} id="Sunday" className={`${classes.dayblock} ${colors.lighterred}`}>Sunday</DaysOfWeek>
            
            </div>

            <TimeCard className={styles.timecard}>Time</TimeCard>
            <div className={styles.scroll}>
                <div className={styles.taskscontainer}>

                    {tasks.length > 0 ? filteredTasks.map((item)=>{
                            return(
                                <div className={styles.addedtasksdiv} key={item.id}>
                                <div>
                                                <TimeCard className={DayClasses}>{item.enteredTaskTime}</TimeCard>
                                                </div>
                                                <MeetingDetailCard className={DayClasses}>
                                                <h3>{item.enteredTaskName}</h3>
                                                <FormBtn onClick={()=>deleteOneTask(item.id)} className={btnstyles.deleteallbtn} type="button">Delete</FormBtn>
                                                </MeetingDetailCard>
                                            </div>
                                        );
                                    })
                    : ''}
 
                </div>
            </div>

        </Fragment>
        
    );
}

export default AddMeeting;