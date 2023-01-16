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

    const [inputValid, setInputValid] = useState(true);
    console.log(inputValid);

    const submitHandler = (event) => {

        event.preventDefault();

        console.log("Entered last name: " + userInput.enteredLastName);

        //validation
        if((!validateName.test(userInput.enteredFirstName)
        || (!validateLastName.test(userInput.enteredLastName))
        || (!validateEmail.test(userInput.enteredEmail))
        || (!validatePasword.test(userInput.enteredPassword)))){
            alert("Invalid credentials. Please try again.")
            setInputValid(false);
        }else if(userInput.enteredPassword !== userInput.enteredPasswordConfirm){
            alert("Passwords do not match.");
        }else{
            navigate('/login');
        }

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
    

    const inputClasses = inputValid ? classes['registerinput'] : classes['inputerror'];
    const selectClasses = inputValid ? classes['selectform'] : classes['selecterror'];
    
    return(
        <form className={classes.registerform} onSubmit={submitHandler}>
            <div className={classes.inputdiv}>
                <label htmlFor='firstname'>first name</label>
                <input onChange={nameChangeHandler} className={inputClasses} type="text" id="firstname" placeholder="Your first name"/>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='lastname'>last name</label>
                <input onChange={lastNameChangeHandler} className={inputClasses} type="text" id="lastname" placeholder="Your last name"/>
            </div>
           
            <div className={classes.inputdiv}>
                <label htmlFor='date'>birth date</label>
                <input className={inputClasses} type="date" id="date" placeholder="MM/DD/YY"/>     
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='countries'>country</label>
                <select id="countries" className={selectClasses}>
                <option value="Your Country" selected disabled>Your Country</option>
                    <option value="Brasil">Brasil</option>
                </select>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='city'>city</label>
                <input className={inputClasses} type="text" id='city' placeholder="Your city"/>
            </div>
            
            <div className={classes.inputdiv}>
                <label htmlFor='email'>e-mail</label>
                <input onChange={emailChangeHandler} className={inputClasses} type="email" id='email' placeholder="A valid e-mail here"/>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='password'>password</label>
                <input onChange={passwordChangeHandler} className={inputClasses} type="password" id='password' placeholder="Your password"/>
            </div>

            <div className={classes.inputdiv}>
            <label htmlFor='confirmpass'>password</label>
            <input onChange={passwordConfirmChangeHandler} className={inputClasses} type="password" id="confirmpass" placeholder="Confirm your password"/>
            </div>

            <FormBtn type="submit" text="Register Now"></FormBtn>
    
        </form>
    );
}

export default Form;