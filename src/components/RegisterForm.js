import classes from '../css-components/RegisterForm.module.css';
import FormBtn from '../components/FormBtn';
import {useState} from 'react';
import { validateEmail, validateName, validateLastName, validatePasword } from '../utils/Regex';
import {useNavigate} from 'react-router-dom';

const Form = () => {

    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        enteredFirstName:'',
        enteredLastName:'',
        enteredBirth:'',
        enteredCountry:'',
        enteredCity:'',
        enteredEmail:'',
        enteredPassword:'',
        enteredPasswordConfirm:'',
    });

    const submitHandler = (event) => {

        event.preventDefault();

        console.log("Entered last name: " + userInput.enteredLastName);

        //validation
        if(!validateName.test(userInput.enteredFirstName)){
            alert("Invalid first name. Please try again.")
        };

        if(!validateLastName.test(userInput.enteredLastName)){
            alert("Invalid last name. Please try again.")
        };

        if(!validateEmail.test(userInput.enteredEmail)){
            alert("Invalid e-mail. Please try again.")
        };

        
        if(!validatePasword.test(userInput.enteredPassword)){
            alert("Invalid password (must contain 8 characters and a number).")
        };

        if(userInput.enteredPassword !== userInput.enteredPasswordConfirm){
            alert("Passwords do not match.");
        }

        navigate('/login');

    };

    const nameChangeHandler = (event) => {
        setUserInput({
            ...userInput,
            enteredFirstName: event.target.value
        })
    };

    const lastNameChangeHandler = (event) => {
        setUserInput({
            ...userInput,
            enteredLastName: event.target.value
        })
    };

    
    const emailChangeHandler = (event) => {

        setUserInput({
            ...userInput,
            enteredEmail: event.target.value
        })
    };

    const passwordChangeHandler = (event) => {
        setUserInput({
            ...userInput,
            enteredPassword: event.target.value
        })
    };

    const passwordConfirmChangeHandler = (event) => {
        setUserInput({
            ...userInput,
            enteredPasswordConfirm: event.target.value
        })
    };
    

    
    return(
        <form className={classes.registerform} onSubmit={submitHandler}>
            <div className={classes.inputdiv}>
                <label htmlFor='firstname'>first name</label>
                <input onChange={nameChangeHandler} className={classes.registerinput} type="text" id="firstname" placeholder="Your first name"/>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='lastname'>last name</label>
                <input onChange={lastNameChangeHandler} className={classes.registerinput} type="text" id="lastname" placeholder="Your last name"/>
            </div>
           
            <div className={classes.inputdiv}>
                <label htmlFor='date'>birth date</label>
                <input className={classes.registerinput} type="date" id="date" placeholder="MM/DD/YY"/>     
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='countries'>country</label>
                <select id="countries">
                <option value="Your Country" selected disabled>Your Country</option>
                    <option value="Brasil">Brasil</option>
                </select>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='city'>city</label>
                <input className={classes.registerinput} type="text" id='city' placeholder="Your city"/>
            </div>
            
            <div className={classes.inputdiv}>
                <label htmlFor='email'>e-mail</label>
                <input onChange={emailChangeHandler} className={classes.registerinput} type="email" id='email' placeholder="A valid e-mail here"/>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='password'>password</label>
                <input onChange={passwordChangeHandler} className={classes.registerinput} type="password" id='password' placeholder="Your password"/>
            </div>

            <div className={classes.inputdiv}>
            <label htmlFor='confirmpass'>password</label>
            <input onChange={passwordConfirmChangeHandler} className={classes.registerinput} type="password" id="confirmpass" placeholder="Confirm your password"/>
            </div>

            <FormBtn type="submit" text="Register Now"></FormBtn>
    
        </form>
    );
}

export default Form;