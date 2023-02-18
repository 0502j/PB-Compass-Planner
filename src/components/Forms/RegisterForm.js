import classes from "./Form.module.css";
import styles from "../Meetings/AddMeeting.module.css";
import btnclasses from "./FormBtn.module.css";
import FormBtn from "./FormBtn";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
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
import { isArray } from "lodash";

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
    setInputValid(true);

    //validation

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
          if(
            !validateName.test(userInput.firstName) ||
            !validateLastName.test(userInput.lastName) ||
            !validateEmail.test(userInput.email) ||
            !validateCity.test(userInput.city) || 
            !validateCountry.test(userInput.country)
            ){
              setInputValid(true);
              setModalMessage({title:"Registration failed.", description: isArray(data.errors) ? data.errors[0] : data, isError: true});
              setShowModal(true);
              setLoading(false);
              setUserInput(null);
              setInputValid(false);
              return;
        } 
        if(userInput.password !== userInput.confirmPassword || !validatePasword.test(userInput.password)) {
          setModalMessage({title: "Registration failed.", description: "Passwords need to match & have at least 6 chars with a number.", isError: true});
          setLoading(false);
          setShowModal(true);
          setInputValid(false);
          return;
        }

        setInputValid(true);
        setModalMessage({title:"Registration failed.", description: isArray(data.errors) ? data.errors[0] : data, isError: true});
        setShowModal(true);
        setLoading(false);
        setInputValid(false);
        return;

      }
      else{
        setShowModal(true);
        setModalMessage({title: "Registration success!", description: "Redirecting to login page...", isError: false})

          setTimeout(()=>{
              navigate("/");
          }, 3000)

        setLoading(false);
      }
          
      });
      
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

  //adding data to localstorage
   //Adding data to localstorage
   useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userInput));
  }, [userInput]);


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
