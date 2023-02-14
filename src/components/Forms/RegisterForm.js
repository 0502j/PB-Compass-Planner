import classes from "./Form.module.css";
import styles from "../Meetings/AddMeeting.module.css";
import btnclasses from "./FormBtn.module.css";
import FormBtn from "./FormBtn";
import { Fragment, useContext, useRef, useState } from "react";
import {
  validateEmail,
  validateName,
  validateLastName,
  validatePasword,
  validateCity,
  validateCountry
} from "../../utils/Regex";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { AuthContext } from "../../store/user-context";
import ConfirmModal from "../UI/ConfirmModal";
import LoadingSpinner from "../UI/LoadingSpinner";
import {AiOutlineCheckCircle} from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';

const Form = () => {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(AuthContext);
  setIsLogged(false);

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    city: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputValid, setInputValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState({
      title:"",
      description:"",
      isError: false
  });
  const [showModal, setShowModal] = useState(false);

  const submitHandler = (event) => {

    event.preventDefault();

    //validation
    if(userInput == null){
      setModalMessage({
        title: "Invalid credentials.",
        description: "Please fill all the fields to register."
      });
      setShowModal(true);
      return;
    }

    if(userInput.firstName === "" ||
    userInput.lastName === "" ||
    userInput.city === "" ||
    userInput.birthDate === "" ||
    userInput.country === "" ||
    !validateName.test(userInput.firstName) ||
    !validateLastName.test(userInput.lastName) ||
    !validateEmail.test(userInput.email) ||
    !validatePasword.test(userInput.password) ||
    !validateCity.test(userInput.city) ||
    !validateCountry.test(userInput.country)
    ){
      setInputValid(true);
      setModalMessage({
        title: "Invalid credentials, please try again.",
        description: "Hints: fields can't be empty, password must contain at least 8 chars and a number.",
        isError: true
      });
      setShowModal(true);
      
    }else if (userInput.password !== userInput.confirmPassword) {
      setModalMessage({title: "Passwords do not match.", description: "", isError: true});
      setShowModal(true);
    }else {

      setLoading(true);
      //required body for post request
      const postOpts = {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(userInput)
      };

      fetch('https://latam-challenge-2.deta.dev/api/v1/users/sign-up', postOpts)
      .then(async response => {
        const data = await response.json();
        //checking response errors
        if(!response.ok){
          setModalMessage({title:"Registration failed.", description:data, isError: true});
          setShowModal(true);
          setLoading(false);
        }else{
          setShowModal(true);
          setModalMessage({title: "Registration success!", description: "Redirecting to login page...", isError: false})
  
            setTimeout(()=>{
                navigate("/");
            }, 3000)
         
        }
        setLoading(false);
      });
      
    }
  }

  //gathering user input
  const nameChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      firstName: event.target.value,
    });
  };

  const lastNameChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      lastName: event.target.value,
    });
  };

  const birthChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      birthDate: event.target.value,
    });
  };

  const countryChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      country: event.target.value,
    });
  };

  const cityChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      city: event.target.value,
    });
  };

  const emailChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      email: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      password: event.target.value,
    });
  };

  const passwordConfirmChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      confirmPassword: event.target.value,
    });
  };

  //closing error modal control
  const modalClose = () => {
    setShowModal(false);
  };


  //Class control
  const inputClasses = inputValid
    ? classes["forminput"]
    : classes["inputerror"];
  const selectClasses = inputValid
    ? classes["selectform"]
    : classes["selecterror"];

  return (

   <Fragment>
     {showModal && (
      <ConfirmModal>
      <div className={styles.descicon}> {modalMessage.isError == true ? <RiErrorWarningLine/> : <AiOutlineCheckCircle/>}</div>
        <br/>
        <h3>{modalMessage.title}</h3>
        <h4>{modalMessage.description}</h4>
        <br/>
        <div className={styles.confirmdeletion}>
          <FormBtn className={`${classes.confirminputs} ${classes.cancel}`} onClick={modalClose}>
            OK
          </FormBtn>
        </div>
      </ConfirmModal>
    )}

      <div>
            {loading ? <Fragment><LoadingSpinner/><br/></Fragment> : 
            
            <form onSubmit={submitHandler}>
              <div className={classes.inputdiv}>
                <label htmlFor="firstname">first name</label>
                <Input
                  onChange={nameChangeHandler}
                  className={inputClasses}
                  type="text"
                  id="firstname"
                  placeholder="Your first name"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="lastname">last name</label>
                <Input
                  onChange={lastNameChangeHandler}
                  className={inputClasses}
                  type="text"
                  id="lastname"
                  placeholder="Your last name"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="date">birth date</label>
                <Input
                  onChange={birthChangeHandler}
                  className={inputClasses}
                  id="date"
                  type="date"
                  placeholder="MM/DD/YYYY"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="country">country</label>
                <Input
                  onChange={countryChangeHandler}
                  className={inputClasses}
                  type="text"
                  id="country"
                  placeholder="Your country"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="city">city</label>
                <Input
                  onChange={cityChangeHandler}
                  className={inputClasses}
                  type="text"
                  id="city"
                  placeholder="Your city"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="email">e-mail</label>
                <Input
                  onChange={emailChangeHandler}
                  className={inputClasses}
                  type="email"
                  id="email"
                  placeholder="A valid e-mail here"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="password">password</label>
                <Input
                  onChange={passwordChangeHandler}
                  className={inputClasses}
                  type="password"
                  id="password"
                  placeholder="Your password"
                />
              </div>

              <div className={classes.inputdiv}>
                <label htmlFor="confirmpass">password</label>
                <Input
                  onChange={passwordConfirmChangeHandler}
                  className={inputClasses}
                  type="password"
                  id="confirmpass"
                  placeholder="Confirm your password"
                />
              </div>

              {!inputValid ? (
                <p className={classes.inputinvalid}>
                  Invalid credentials. Please try again!
                </p>
              ) : (
                ""
              )}

              <FormBtn className={btnclasses.btn} type="submit">
                Register Now
              </FormBtn>
            </form>
      
      }
      </div>
    
    
    

   </Fragment>

    
  );
};

export default Form;
