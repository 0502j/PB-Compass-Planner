import { createRef, Fragment, useEffect, useState } from "react";
import classes from "../Forms/Form.module.css";
import styles from "./AddMeeting.module.css";
import btnstyles from "../Forms/FormBtn.module.css";
import modalclasses from '../UI/Modal.module.css';
import colors from "../UI/Colors.module.css";
import Input from "../Forms/Input";
import FormBtn from "../Forms/FormBtn";
import DaysOfWeek from "../Header/DaysOfWeek";
import TimeCard from "./TimeCard";
import MeetingDetailCard from "./MeetingDetailCard";
import ConfirmModal from "../UI/ConfirmModal";
import DaySelect from "../Forms/DaySelect";
import LoadingSpinner from "../UI/LoadingSpinner";

const AddMeeting = () => {
  const [taskInput, setTaskInput] = useState({
    id: "",
    enteredTaskName: [],
    enteredTaskDay: "",
    enteredTaskTime: "",
  });

  const nameRef = createRef();
  const dayRef = createRef();
  const timeRef = createRef();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
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

  //Removing single or all tasks at once
  const removeAllTasks = () => {
    setShowModal(false);
    setTasks(tasks.filter((info) => info.enteredTaskDay !== weekdaySelected));
    setFilteredTasks([]);

    fetch(`https://latam-challenge-2.deta.dev/api/v1/events?dayOfWeek=${weekdaySelected}`, {
      method: 'DELETE',
      headers:{
      Authorization: "Bearer " + curToken,
    },})
          .then(async response => {
            const data = await response.json();
            if(!response.ok){
              setHasError({title: "Tasks deletion fail! Please try again."})
            }else{
              setModalMessage({title: `Removed all tasks from ${weekdaySelected}.`})
              modalOpen();
              setTimeout(()=>{
                modalClose();
              }, 3000);
            }
  
  });
  }

  const deleteOneTask = (id, index) => {
    const tasksArr = [...tasks];

    //check if there are conflicting cards before deleting
    const taskPosition = tasksArr.findIndex((info) => {
      return info.id === id;
    });

    //if there's only one task take its position and remove it
    if (tasksArr[taskPosition].enteredTaskName.length === 1) {
      tasksArr.splice(taskPosition, 1);
    }
    //if there are conflicting tasks, at the index position remove 1 item
    else {
      tasksArr[taskPosition].enteredTaskName.splice(index, 1);
    }

    setTasks(tasksArr);
  };

  //Confirm Deletion modal
  const modalClose = () => {
    setShowModal(false);
  };

  const modalOpen = () => {
    setShowModal(true);
    
  };

  const modalOpenDeletion = () => {
    setModalMessage({title: `Are you sure you want to remove ALL tasks of the ${weekdaySelected}?`, description: "This cannot be undone!", isError: false, isDeletion:true})
    setShowModal(true);

  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      nameRef.current.value.length === 0 ||
      dayRef.current.value.length === 0 ||
      timeRef.current.value.length === 0
    ) {
      setModalMessage({
        title: "Task creation fail!",
        description: "You cannot add a task with empty fields.",
        isError: true,
        isDeletion: false
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
        try{
          setLoading(true);
          setModalMessage({title: "Creating task..."});
          modalOpen();
          fetch('https://latam-challenge-2.deta.dev/api/v1/events', postOpts)
          .then(async response => {
            const data = await response.json();

            if(!response.ok){
              throw new Error("Task creation fail!");
            }
              modalClose();
              setLoading(false);

              const findTasks = [...tasks].findIndex((info) => {
                return info.enteredTaskDay === dayRef.current.value && info.enteredTaskTime === timeRef.current.value;
              });
          
              const newTasks = [...tasks];
              if (findTasks >= 0) {
                newTasks[findTasks].enteredTaskName.push(nameRef.current.value);
              } else {
                newTasks.push({
                  id: Math.floor(Math.random() * 1000) + 1,
                  enteredTaskName: [nameRef.current.value],
                  enteredTaskDay: dayRef.current.value,
                  enteredTaskTime: timeRef.current.value,
                });
              }
              setTasks(newTasks);
          });
        }catch(err){
          setModalMessage({title: err});
          modalOpen();
        }
    }
  };

  let fetchData = []; 

   //Fetching user tasks
   useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`https://latam-challenge-2.deta.dev/api/v1/events?dayOfWeek=${weekdaySelected}`, {headers:{
        'Content-Type': 'application/json',
        Authorization: "Bearer " + curToken
      },});
      const fetchData = await response.json();
      if(!response.ok){
        setLoading(false);
        setHasError({title: "No tasks found!", description:"Try selecting a filter or reload the page."})
      }else{
        //will receive an event object with events descriptions
        console.log(fetchData);
        setLoading(false);
        setHasError({title: "", description:""});
      }
      
  })();

  }, [weekdaySelected]);

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

  useEffect(() => {
    setFilteredTasks(
      tasks.sort((taskA, taskB) => {
        return taskA.enteredTaskTime > taskB.enteredTaskTime ? 1 : -1;
      }) && tasks.filter((info) => info.enteredTaskDay === weekdaySelected)
    );
  }, [tasks]);

  const WeekDaysHandler = (event) => {
    setFilteredTasks(
      tasks.filter((info) => info.enteredTaskDay === event.currentTarget.id)
    );
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
          <div className={modalclasses.loadingwmodal}>
            {loading ? <LoadingSpinner/> : ''}
          </div>
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
          {fetchData
            ? fetchData.map((item) => {
                return (
                  <Fragment>
                      <div className={item.events.description.length > 1 ? styles.conflictscontainer : styles.meetingscontainer}>
                      <div className={styles.addedtasksdiv} key={item.id}>
                        <div>
                          <TimeCard className={item.enteredTaskName.length > 1 ? colors.conflicted : DayClasses}>
                            {item.enteredTaskTime}
                          </TimeCard>
                        </div>

                        {item.enteredTaskName.map((info, index) => (
                          <div className={item.enteredTaskName.length > 1 ? styles.conflicted : styles.meetingct}>
                            <MeetingDetailCard className={item.enteredTaskName.length > 1 ? colors.conflicted : DayClasses}>
                                <h3>{info}</h3>
                                <FormBtn
                                  onClick={() => deleteOneTask(item.id, index)}
                                  className={btnstyles.deleteallbtn}
                                  type="button"
                                >
                                  Delete
                                </FormBtn>
                            </MeetingDetailCard>
                          </div>
                        ))}
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
