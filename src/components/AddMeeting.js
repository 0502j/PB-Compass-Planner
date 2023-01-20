import classes from '../css-components/Form.module.css';
import styles from '../css-components/AddMeeting.module.css';
import colors from '../css-components/Colors.module.css';
import Input from '../components/Input';
import FormBtn from '../components/FormBtn';
import TimeCard from './TimeCard';
import { Fragment, useState, useEffect } from 'react';
import DaysOfWeek from '../components/DaysOfWeek';
import MeetingDetailCard from './MeetingDetailCard';

const AddMeeting = () => {

    const [taskInput, setTaskInput] = useState({
        enteredTaskName:'',
        enteredTaskDay:'',
        enteredTaskTime:''
    });

    const [tasks, setTasks] = useState([]);
    const [shownTasks, setShownTasks] = useState(tasks);

    const addComponent = () => {
        setTasks([...tasks, taskInput]);
    }

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

    //Adding data to localstorage
    useEffect(() => {
        localStorage.setItem("taskdata", JSON.stringify(taskInput));
    },[taskInput]);

    const data = window.localStorage.getItem("taskdata");
    localStorage.setItem("taskdata", JSON.stringify(data));
    const parsedData = JSON.parse(data);

    //Removing single or all tasks
    const removeAllComponents = () => {
        setTasks([]);
    }

    const deleteSingleTaskHandler = (event) => {
        let filtered = tasks.filter(item=>item!==event.target.value)
        setTasks({tasks: filtered});

        console.log(tasks);
    }


    const submitHandler = (event) => {
        event.preventDefault();

        if(taskInput.enteredTaskDay === 'Task day' ||
        taskInput.enteredTaskTime === 'Task time'){
            alert("Task information invalid. Please try again!");
        }

    }
    

    return(
        <Fragment>
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
                    <select onChange={taskTimeChangeHandler} className={`${classes.taskinput} ${classes.taskdateinput}`}>
                        <option selected disabled>Task time</option>
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
                        <FormBtn onClick={addComponent} type="submit" className={`${styles.taskbtn} ${styles.addtaskbtn}`}>+ Add to calendar</FormBtn>
                        <FormBtn onClick={removeAllComponents} type="submit" className={`${styles.taskbtn} ${styles.deletealltasksbtn}`}>- Delete All</FormBtn>
                    </div>
                </div>
            </form>

            <DaysOfWeek/>
            <TimeCard className={styles.timecard}>Time</TimeCard>
            <div className={styles.horizontalscroll}>
                <div className={styles.addedtasksdiv}>
                {tasks.map((item, id)=>{
                        return(
                            <Fragment key={id}>
                                <TimeCard className={colors.lighterred}>{item.enteredTaskTime}</TimeCard>
                                <MeetingDetailCard onClick={deleteSingleTaskHandler} className={colors.lighterred}>
                                <h3>{item.enteredTaskName}</h3>
                                </MeetingDetailCard>
                            </Fragment>
                        );
                
                    })}


                </div>
            </div>
            
        </Fragment>
    );
}

export default AddMeeting;