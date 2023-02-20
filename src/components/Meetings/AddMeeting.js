import { createRef, Fragment, useLayoutEffect, useState } from "react";
import classes from "../Forms/Form.module.css";
import styles from "./AddMeeting.module.css";
import btnstyles from "../Forms/FormBtn.module.css";
import daystyles from '../Header/DaysOfWeek.module.css';
import colors from "../UI/Colors.module.css";
import DaysOfWeek from "../Header/DaysOfWeek";
import TimeCard from "./TimeCard";
import MeetingDetailCard from "./MeetingDetailCard";
import ConfirmModal from "../UI/ConfirmModal";
import DaySelect from "../Forms/DaySelect";
import LoadingSpinner from "../UI/LoadingSpinner";

const AddMeeting = () => {

  const nameRef = createRef();
  const dayRef = createRef();
  const timeRef = createRef();

  const [fetchedTasks, setFetchedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title:"",
    description:[],
    isError: false,
    isDeletion: false,
  });
  const [loading, setLoading] = useState(false);
  const [weekdaySelected, setWeekdaySelected] = useState("");
  const [hasError, setHasError]=useState({
    title: '',
    description:'',
  })

  const curToken = localStorage.getItem("TOKEN");
  let newTasks = [];
  
  //Reloading functions - getting tasks & reloading them
  const getTasks = async() => {
    setLoading(true);
    const response = await fetch(`https://latam-challenge-2.deta.dev/api/v1/events?dayOfWeek=${weekdaySelected}`, {headers:{
      'Content-Type': 'application/json',
      Authorization: "Bearer " + curToken
    },});
    const data = await response.json();

    if(!response.ok){
      setLoading(false);
      setHasError({title: "No tasks here.", description:"Try selecting a day or reloading the page!"})
      return;
    }
     data.events.map(item => {
      const taskTimeSliced = new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      addTasks({
          id: item._id,
          dayOfWeek: item.dayOfWeek,
          time: taskTimeSliced,
          desc: item.description
      })
    })
      setLoading(false);
      setHasError({title: "", description:""});
    }

    const reloadTasks = () => {
      newTasks = [];
      setFetchedTasks([]);
      getTasks();
    }

    const WeekDaysHandler = (event) => {
      setWeekdaySelected(event.currentTarget.id); 
    };  

    useLayoutEffect(()=>{
      reloadTasks();
    },[weekdaySelected]);

  //Modal control
  const modalClose = () => {
    setShowModal(false);
  };

  const modalOpen = () => {
    setShowModal(true);
  };

  const modalTimeout = () => {
    setTimeout(()=>{
      modalClose();
    },3000)
  }

  const modalOpenDeletion = () => {
    setModalMessage({title: `Are you sure you want to remove ALL tasks of ${weekdaySelected}?`, description: "This cannot be undone!", isError: false, isDeletion:true})
    setShowModal(true);
  }

  //Removing single or all tasks at once
  const removeAllTasks = () => {
    setShowModal(false);
        fetch(`https://latam-challenge-2.deta.dev/api/v1/events?dayOfWeek=${weekdaySelected}`, {
          method: 'DELETE',
          headers:{
          Authorization: "Bearer " + curToken,
        },})
          .then(async response => {
            const data = await response.json();

            if(data.deletedEvents && data.deletedEvents.length == 0){
              setModalMessage({title: `Could not delete tasks of ${weekdaySelected}.`, description: 'There are no tasks to delete!'})
              modalOpen();
              modalTimeout();
              return;
            }

            if(!response.ok){
              setModalMessage({title: `Could not delete tasks of ${weekdaySelected}.`, description: "Please try again later!" })
              modalOpen();
              setTimeout(()=>{
                modalClose();
              }, 3000);
              return;
            }
              setModalMessage({title: `Removed all tasks from ${weekdaySelected}.`})
              modalOpen();
              modalTimeout();
              reloadTasks();
      });
  }

  const deleteOneTask = (id) => {
    try{
      setLoading(true);
      setModalMessage({title: "Deleting task..."});
      modalOpen();
      fetch(`https://latam-challenge-2.deta.dev/api/v1/events/${id}`, {
        method: 'DELETE',
        headers:{
        Authorization: "Bearer " + curToken,
      },})
      .then(async response => {
        if(!response.ok){
          setModalMessage({title: "Unable to delete task.", description: "Please try again later!", isError:true})
          modalOpen();
          reloadTasks();
          return;
        }
          modalClose();
          setLoading(false);
          reloadTasks();

      });
    }catch(err){
      setModalMessage({title: err});
      modalOpen();
    }
  };

  //Create a new task
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      nameRef.current.value.length === 0 ||
      dayRef.current.value.length === 0
    ) {
      setModalMessage({
        title: "Task creation fail!",
        description: "You cannot add a task with empty fields.",
        isError: true,
      })
      modalOpen();
    } else {
      const postOpts = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Authorization: "Bearer " + curToken
        },
        body:JSON.stringify({
          "description": nameRef.current.value.toString(),
          "dayOfWeek": dayRef.current.value,
        })
      }
          setLoading(true);
          setModalMessage({title: "Creating task..."});
          modalOpen();
          fetch('https://latam-challenge-2.deta.dev/api/v1/events', postOpts)
          .then(async response => {
            const data = await response.json();

            if(!response.ok){
              setModalMessage({title: "Unable to create task!", description: data.message});
              modalOpen();
              modalTimeout();
              return;
            }
              modalClose();
              setLoading(false);
              reloadTasks();
          });
    }
  };

  const addTasks = (tasks) => {
    const findTasks = newTasks.findIndex((info) => {
      return info.enteredTaskDay === tasks.dayOfWeek && info.enteredTaskTime === tasks.time;
    });

    if (findTasks >= 0) {
      newTasks[findTasks].enteredTaskName.push({
        id: tasks.id,
        desc: tasks.desc
      });
    } else {
      newTasks.push({
        id: Math.floor(Math.random() * 1000) + 1 + newTasks.length,
        enteredTaskName: [{
          id: tasks.id,
          desc: tasks.desc
        }],
        enteredTaskDay: tasks.dayOfWeek,
        enteredTaskTime: tasks.time,
      });
    }
    setFetchedTasks(newTasks);
  }

  //Weekdays class control
  let DayClasses =
    weekdaySelected === "monday"
      ? colors["redblock"]
      : weekdaySelected === "tuesday"
      ? colors["orangeblock"]
      : weekdaySelected === "wednesday"
      ? colors["yellowblock"]
      : weekdaySelected === "thursday"
      ? colors["lightred"]
      : weekdaySelected === "friday"
      ? colors["lightorange"]
      : weekdaySelected === "saturday"
      ? colors["lightyellow"]
      : weekdaySelected === "sunday"
      ? colors["lighterred"]
      : "";

  return (
    <Fragment>
      {showModal && (
        <ConfirmModal>
          <h3>
            {modalMessage.title}
          </h3>
          <h3>{modalMessage.description}</h3>
          {modalMessage.isError ? 
            <div>
              <br/>
              <button className={`${classes.confirminputs} ${classes.confirm}`} onClick={modalClose}>
                OK
              </button>
            </div>          
          : ''}
          { modalMessage.isDeletion ? <div className={styles.confirmdeletion}>
            <button className={`${classes.confirminputs} ${classes.confirm}`} onClick={removeAllTasks}>
              Delete
            </button>
            <button className={`${classes.confirminputs} ${classes.cancel}`} onClick={modalClose}>
              Cancel
            </button>
          </div> : ''}
          
        </ConfirmModal>
      )}

      <form onSubmit={submitHandler}>
        <div className={classes.taskaddingdiv}>
          <input
            ref={nameRef}
            className={`${classes.taskinput} ${classes.tasknameinput}`}
            type="text"
            id="taskname"
            placeholder="Task or issue"
          />
          <DaySelect ref={dayRef} className={`${classes.taskinput} ${classes.taskdayinput}`}/>
          <input
            ref={timeRef}
            className={`${classes.taskinput} ${classes.taskdateinput}`}
            type="time"
            disabled="disabled"
          />

          <div className={styles.addtaskbuttons}>
            <button  type="submit" className={`${styles.taskbtn} ${styles.addtaskbtn}`}>
              + Add to calendar
            </button>
            <button onClick={modalOpenDeletion} type="button" className={`${styles.taskbtn} ${styles.deletealltasksbtn}`}>
              - Delete All
            </button>
          </div>
        </div>
      </form>

      <div className={styles.weekdaysdiv}>
        <DaysOfWeek onClick={WeekDaysHandler} id="monday" className={weekdaySelected == 'monday' ? [colors['redblock'], daystyles['shadow']].join(' ') : [colors['redblock']]}>
          Monday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="tuesday" className={weekdaySelected == 'tuesday' ? [colors['orangeblock'], daystyles['shadow']].join(' ') : [colors['orangeblock']]}>
          Tuesday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="wednesday" className={weekdaySelected == 'wednesday' ? [colors['yellowblock'], daystyles['shadow']].join(' ') : [colors['yellowblock']]}>
          Wednesday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="thursday" className={weekdaySelected == 'thursday' ? [colors['lightred'], daystyles['shadow']].join(' ') : [colors['lightred']]}>
          Thursday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="friday" className={weekdaySelected == 'friday' ? [colors['lightorange'], daystyles['shadow']].join(' ') : [colors['lightorange']]}>
          Friday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="saturday" className={weekdaySelected == 'saturday' ? [colors['lightyellow'], daystyles['shadow']].join(' ') : [colors['lightyellow']]}>
          Saturday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="sunday" className={weekdaySelected == 'sunday' ? [colors['lighterred'], daystyles['shadow']].join(' ') : [colors['lighterred']]}>
          Sunday
        </DaysOfWeek>
      </div>

      <TimeCard className={styles.timecard}>Time</TimeCard>

      <div className={styles.scrollContent}>
        <div className={styles.taskscontainer}>
        {loading && <div className={styles.taskloading}><LoadingSpinner/></div>}
          {fetchedTasks && !loading
            ? fetchedTasks.map((item) => {
                return (
                  <Fragment key={item._id}>
                      <div className={item.enteredTaskName.length > 1 ? styles.conflictscontainer : styles.meetingscontainer}>
                      <div className={styles.addedtasksdiv} key={item.id}>
                        <div>
                          <TimeCard className={item.enteredTaskName.length > 1 ? colors.conflicted : DayClasses}>
                            {item.enteredTaskTime}
                          </TimeCard>
                        </div>
                        {item.enteredTaskName.map((info) => (
                          <div key={info.id} className={item.enteredTaskName.length > 1 ? styles.conflicted : styles.meetingct}>
                            <MeetingDetailCard className={item.enteredTaskName.length > 1 ? colors.conflicted : DayClasses}>
                                <h3>{info.desc}</h3>
                                <button
                                  onClick={() => deleteOneTask(info.id)}
                                  className={btnstyles.deleteallbtn}
                                  type="button"
                                >
                                  Delete
                                </button>
                            </MeetingDetailCard>
                          </div>
                        )) }
                      </div>
                    </div>
                  </Fragment>
                );
              })
            : ''}
            {!loading && hasError.title.length >= 1 ?
             <div className={styles.taskserror}>
              <h2>{hasError.title}</h2>
              <h3>{hasError.description}</h3>
            </div> : ''}
        </div>
      </div>
    </Fragment>
  );
};

export default AddMeeting;
