import { createRef, Fragment, useEffect, useState } from "react";
import classes from "../Forms/Form.module.css";
import styles from "./AddMeeting.module.css";
import btnstyles from "../Forms/FormBtn.module.css";
import colors from "../UI/Colors.module.css";
import Input from "../Forms/Input";
import FormBtn from "../Forms/FormBtn";
import DaysOfWeek from "../Header/DaysOfWeek";
import TimeCard from "./TimeCard";
import MeetingDetailCard from "./MeetingDetailCard";
import ConfirmModal from "../UI/ConfirmModal";
import DaySelect from "../Forms/DaySelect";
import LoadingSpinner from "../UI/LoadingSpinner";
import { isArray } from "lodash";

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

  useEffect(()=>{
    getTasks();
  },[weekdaySelected]);

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
              setTimeout(()=>{
                modalClose();
              }, 3000);
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
              setTimeout(()=>{
              modalClose();
              }, 3000);
              getTasks();

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
          throw new Error("Task deletion fail! Please try again.");
        }
          modalClose();
          setLoading(false);
          getTasks();

      });
    }catch(err){
      setModalMessage({title: err});
      modalOpen();
    }
  };

  //Modal control
  const modalClose = () => {
    setShowModal(false);
  };

  const modalOpen = () => {
    setShowModal(true);
  };

  const modalOpenDeletion = () => {
    setModalMessage({title: `Are you sure you want to remove ALL tasks of ${weekdaySelected}?`, description: "This cannot be undone!", isError: false, isDeletion:true})
    setShowModal(true);
  }

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
              setTimeout(()=>{
                modalClose();
              },3000)
              return;
            }
              modalClose();
              setLoading(false);
              getTasks();

              //to do: time conflict
              // const findTasks = [...fetchedTasks].findIndex((info) => {
              //   return info.enteredTaskDay === dayRef.current.value && info.enteredTaskTime === timeRef.current.value;
              // });
          
              // const newTasks = [...fetchedTasks];
              // if (findTasks >= 0) {
              //   newTasks[findTasks].enteredTaskName.push(nameRef.current.value);
              // } else {
              //   newTasks.push({
              //     id: Math.floor(Math.random() * 1000) + 1,
              //     enteredTaskName: [nameRef.current.value],
              //     enteredTaskDay: dayRef.current.value,
              //     enteredTaskTime: timeRef.current.value,
              //   });
              // }
              // setFetchedTasks(newTasks);
          });
        
    }
  };

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
          setFetchedTasks(data.events);
          setLoading(false);
          setHasError({title: "", description:""});
        }
  
  //Week days validation & class control
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

  const WeekDaysHandler = (event) => {
    setWeekdaySelected(event.currentTarget.id); 
  };

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
              <FormBtn className={`${classes.confirminputs} ${classes.confirm}`} onClick={modalClose}>
                OK
              </FormBtn>
            </div>          
          : ''}
          { modalMessage.isDeletion ? <div className={styles.confirmdeletion}>
            <FormBtn className={`${classes.confirminputs} ${classes.confirm}`} onClick={removeAllTasks}>
              Delete
            </FormBtn>
            <FormBtn className={`${classes.confirminputs} ${classes.cancel}`} onClick={modalClose}>
              Cancel
            </FormBtn>
          </div> : ''}
          
        </ConfirmModal>
      )}

      <form onSubmit={submitHandler}>
        <div className={classes.taskaddingdiv}>
          <Input
            ref={nameRef}
            className={`${classes.taskinput} ${classes.tasknameinput}`}
            type="text"
            id="taskname"
            placeholder="Task or issue"
          />
          <DaySelect ref={dayRef} className={`${classes.taskinput} ${classes.taskdayinput}`}/>
          <Input
            ref={timeRef}
            className={`${classes.taskinput} ${classes.taskdateinput}`}
            type="time"
            disabled="disabled"
          />

          <div className={styles.addtaskbuttons}>
            <FormBtn  type="submit" className={`${styles.taskbtn} ${styles.addtaskbtn}`}>
              + Add to calendar
            </FormBtn>
            <FormBtn onClick={modalOpenDeletion} type="button" className={`${styles.taskbtn} ${styles.deletealltasksbtn}`}>
              - Delete All
            </FormBtn>
          </div>
        </div>
      </form>

      <div className={styles.weekdaysdiv}>
        <DaysOfWeek onClick={WeekDaysHandler} id="monday"className={colors.redblock}>
          Monday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="tuesday" className={colors.orangeblock}>
          Tuesday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="wednesday" className={colors.yellowblock}>
          Wednesday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="thursday" className={colors.lightred}>
          Thursday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="friday" className={colors.lightorange}>
          Friday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="saturday" className={colors.lightyellow}>
          Saturday
        </DaysOfWeek>
        <DaysOfWeek onClick={WeekDaysHandler} id="sunday" className={colors.lighterred}>
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
                      <div className={item.description?.length > 1 ? styles.conflictscontainer : styles.meetingscontainer}>
                      <div className={styles.addedtasksdiv} key={item.id}>
                        <div>
                          <TimeCard className={DayClasses}>
                            {item.createdAt.slice(11,-8)}
                          </TimeCard>
                        </div>
                        {isArray(item.description) ? item.description.map((info) => (
                          <div className={item.description.length > 1 ? styles.conflicted : styles.meetingct}>
                            <MeetingDetailCard className={item.description.length > 1 ? colors.conflicted : DayClasses}>
                                <h3>{info}</h3>
                                <FormBtn
                                  onClick={() => deleteOneTask(item._id)}
                                  className={btnstyles.deleteallbtn}
                                  type="button"
                                >
                                  Delete
                                </FormBtn>
                            </MeetingDetailCard>
                          </div>
                        )) : 
                        <MeetingDetailCard className={DayClasses}>
                                <h3>{item.description}</h3>
                                <FormBtn
                                  onClick={() => deleteOneTask(item._id)}
                                  className={btnstyles.deleteallbtn}
                                  type="button"
                                >
                                  Delete
                                </FormBtn>
                            </MeetingDetailCard>
                            }
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
