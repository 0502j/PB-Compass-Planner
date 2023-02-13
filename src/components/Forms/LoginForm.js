import { Fragment, useContext, useEffect, useState } from "react";
import Input from "../Forms/Input";
import classes from "./Form.module.css";
import styles from "../Meetings/AddMeeting.module.css";
import FormBtn from "./FormBtn";
import btnclasses from "./FormBtn.module.css";
import { AuthContext } from "../../store/user-context";
import { useNavigate } from "react-router-dom";
import passwordIcon from "../../img/passwordIcon.svg";
import userIcon from "../../img/userIcon.svg";
import ConfirmModal from "../UI/ConfirmModal";
import LoadingSpinner from "../UI/LoadingSpinner";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isUserActive, setIsUserActive] = useState(false);
  const [isPassActive, setIsPassActive] = useState(false);
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });
  const [dataMatch, setDataMatch] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState({
      title:"",
      description:"",
  });
  //Class control
  const inputClasses = dataMatch ? classes["forminput"] : classes["inputerror"];
  const userClasses = isUserActive
    ? classes["iconactive"]
    : classes["iconinactive"];
  const passwordClasses = isPassActive
    ? classes["iconactive"]
    : classes["iconinactive"];

  //UseContext validation
  const { isLogged, setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged == true) {
      navigate("/dashboard");
    }
  }, [setIsLogged, isLogged]);


  //Getting all user input
  const emailChangeHandler = (event) => {
    setUserInputs({
      ...userInputs,
      email: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setUserInputs({
      ...userInputs,
      password: event.target.value,
    });
  };


  //Validation before login
  const submitHandler = (event) => {
    event.preventDefault();   

    if(userInputs.email === "" || userInputs.password === ""){
      setHasError({title: "Fields must not be empty.", description: ""});
      setShowModal(true);
      setDataMatch(false);
    }else{
      setLoading(true);
      //body for login post request
      const postOpts = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(userInputs)
      };

      fetch('https://latam-challenge-2.deta.dev/api/v1/users/sign-in', postOpts)
      .then(async response => {
        const data = await response.json();

        //checking login response errors
        if(!response.ok){
          setLoading(false);
          setIsLogged(false);
          setDataMatch(false);
          setHasError({title: data.message,  description: ""});
          setShowModal(true);
          return;
        }else{
          setDataMatch(true);
          setIsLogged(true);
          navigate("/dashboard");
          setLoading(false);
        }
        
      });
    }

    
    
  }

    //closing error modal control
    const modalClose = () => {
      setShowModal(false);
    };
  

  //Icon animation handlers
  const userActiveHandler = () => {
    setIsUserActive(true);
  };

  const passwordActiveHandler = () => {
    setIsPassActive(true);
  };

  const inputInactiveHandler = () => {
    if (userInputs.email !== "") {
      setIsUserActive(true);
    } else {
      setIsUserActive(false);
    }

    if (userInputs.password !== "") {
      setIsPassActive(true);
    } else {
      setIsPassActive(false);
    }
  };

  return (
    <Fragment>
        {showModal && (
        <ConfirmModal>
          <h3>
            Login error!
          </h3>
          <br/>
          <h4>{hasError.title}</h4>
          <h4>{hasError.description}</h4>
          <div className={styles.confirmdeletion}>
            <FormBtn className={`${classes.confirminputs} ${classes.cancel}`} onClick={modalClose}>
              OK
            </FormBtn>
          </div>
        </ConfirmModal>
      )}

      {loading ? <LoadingSpinner/> :
        <form onSubmit={submitHandler}>
        <div className={classes.loginformdiv}>
          <h3 className={classes.logintitle}>Login</h3>
          <div className={classes.inputdiv}>
            <Input
              onBlur={inputInactiveHandler}
              onFocus={userActiveHandler}
              onChange={emailChangeHandler}
              className={inputClasses}
              type="text"
              id="username"
              placeholder="username"
            />
            <img alt="User logo" className={userClasses} src={userIcon} />
          </div>
          <div className={classes.inputdiv}>
            <Input
              onBlur={inputInactiveHandler}
              onFocus={passwordActiveHandler}
              onChange={passwordChangeHandler}
              className={inputClasses}
              type="password"
              id="password"
              placeholder="password"
            />
            <img
              alt="User logo"
              className={passwordClasses}
              src={passwordIcon}
            />
          </div>
          {!dataMatch ? (
            <div className={classes.loginfail}>
              <p>Wow, invalid username or password.</p>
              <p>Please, try again!</p>
            </div>
          ) : (
            ""
          )}
          <FormBtn className={btnclasses.loginbtn} type="submit">
            Log in
          </FormBtn>
        </div>
      </form>
    }
    </Fragment>
  );

};

export default LoginForm;
