import { Fragment, useEffect, useState } from 'react';
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
import DaySelect from '../Forms/DaySelect';

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
    const [weekdaySelected, setWeekdaySelected] = useState('');

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

    //Adding a task
    const addTask = () => {

        if(taskInput.enteredTaskDay === '' ||
        taskInput.enteredTaskTime === ''){
            alert("Task information invalid. Please try again!");
        }
        else{
            setTaskInput({
                ...taskInput,
                id: Math.floor(Math.random() * 100) + 1,
            });
    
            setTasks(prevTasks =>
                [...prevTasks, taskInput]
            );
            
        }

    }

    //Removing single or all tasks at once
    const removeAllTasks = () => {
        setShowModal(false);
        setTasks(tasks.filter((info) => info.enteredTaskDay !== weekdaySelected));
        setFilteredTasks([]);

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
    let DayClasses = (
        weekdaySelected === "Monday" ? colors['redblock'] : 
        weekdaySelected === "Tuesday" ? colors['orangeblock'] : 
        weekdaySelected === "Wednesday" ? colors['yellowblock'] : 
        weekdaySelected === "Thursday" ? colors['lightred'] : 
        weekdaySelected === "Friday" ? colors['lightorange'] : 
        weekdaySelected === "Saturday" ? colors['lightyellow'] : 
        weekdaySelected === "Sunday" ? colors['lighterred'] : ''
    )

    useEffect(()=>{

            setFilteredTasks(
            tasks.sort((taskA, taskB) => {
                return  taskA.enteredTaskTime > taskB.enteredTaskTime ? 1 : -1;
              }) && tasks.filter((info) => info.enteredTaskDay === weekdaySelected));

    },[tasks]);

          
    const WeekDaysHandler = (event) => {

        setFilteredTasks(tasks.filter((info) => info.enteredTaskDay === event.currentTarget.id));
        setWeekdaySelected(event.currentTarget.id);
        
       
    }


    return(
        <Fragment>
            {showModal &&
                <ConfirmDeletion>
                    <h3>Are you sure you want to delete all tasks of the selected day?</h3>
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
                    <DaySelect onChange={taskDayChangeHandler} className={`${classes.taskinput} ${classes.taskdayinput}`}/>
                    <Input onChange={taskTimeChangeHandler} className={`${classes.taskinput} ${classes.taskdateinput}`} type="time"/>
                    <div className={styles.addtaskbuttons}>
                        <FormBtn onClick={addTask} type="submit" className={`${styles.taskbtn} ${styles.addtaskbtn}`}>+ Add to calendar</FormBtn>
                        <FormBtn onClick={modalOpen} type="submit" className={`${styles.taskbtn} ${styles.deletealltasksbtn}`}>- Delete All</FormBtn>
                    </div>
                </div>
            </form>

            <div className={styles.weekdaysdiv}>
                <DaysOfWeek onClick={WeekDaysHandler} id="Monday" className={colors.redblock}>Monday</DaysOfWeek>
                <DaysOfWeek onClick={WeekDaysHandler} id="Tuesday" className={colors.orangeblock}>Tuesday</DaysOfWeek>
                <DaysOfWeek onClick={WeekDaysHandler} id="Wednesday" className={colors.yellowblock}>Wednesday</DaysOfWeek>
                <DaysOfWeek onClick={WeekDaysHandler} id="Thursday" className={colors.lightred}>Thursday</DaysOfWeek>
                <DaysOfWeek onClick={WeekDaysHandler} id="Friday" className={colors.lightorange}>Friday</DaysOfWeek>
                <DaysOfWeek onClick={WeekDaysHandler} id="Saturday" className={colors.lightyellow}>Saturday</DaysOfWeek>
                <DaysOfWeek onClick={WeekDaysHandler} id="Sunday" className={colors.lighterred}>Sunday</DaysOfWeek>
            </div>

            <TimeCard className={styles.timecard}>Time</TimeCard>
            
            <div className={styles.scrollContent}>
                <div className={styles.taskscontainer}>

                    {filteredTasks ? filteredTasks.map((item)=>{
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