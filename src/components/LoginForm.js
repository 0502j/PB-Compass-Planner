import {Fragment, useState} from 'react';
import Input from '../components/Input';
import classes from '../css-components/Form.module.css';
import FormBtn from '../components/FormBtn';
import btnclasses from '../css-components/FormBtn.module.css';

const LoginForm = () => {

    //getting localstorage object data to validate info
    const data = window.localStorage.getItem("userdata");
    localStorage.setItem("userData", JSON.stringify(data));
    const parsedData = JSON.parse(data);
         
    //storing parsedData into vars
    const firstName = parsedData.enteredFirstName;
    const lastName = parsedData.enteredLastName;
    const email = parsedData.enteredEmail;
    const password = parsedData.enteredPassword;
    const fullname = firstName + lastName;
   
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [dataMatch, setDataMatch] = useState(true);

    //class control
    const inputClasses = dataMatch ? classes['forminput'] : classes['inputerror'];

    //get useState data with adequate format
    const usernameString = JSON.stringify(enteredUsername);
    const usernameParse = JSON.parse(usernameString);
    const passwordString = JSON.stringify(enteredPassword);
    const passwordParse = JSON.parse(passwordString);


    const submitHandler = (event) => {
        event.preventDefault();
        
        if((fullname == usernameParse.enteredUsername ||
            usernameParse.enteredUsername === email) &&
            password == passwordParse.enteredPassword){
            alert("Data match!");
        }else{
            alert("Username and/or password does not match registration data...");
            setDataMatch(false);
        }
    
    }
    
    const usernameChangeHandler = (event) => {
        setEnteredUsername({
            ...setEnteredUsername,
            enteredUsername: event.target.value
        })
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword({
            ...setEnteredPassword,
            enteredPassword: event.target.value
        })
    };

    return(
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className={classes.loginformdiv}>
                    <h3 className={classes.logintitle}>Login</h3>
                    <div className={classes.inputdiv}>
                        <Input onChange={usernameChangeHandler} className={inputClasses} type="text" id="username" placeholder="user name"/>
                    </div>
                    <div className={classes.inputdiv}>
                        <Input onChange={passwordChangeHandler} className={inputClasses} type="password" id="password" placeholder="password"/>
                    </div>
                    <FormBtn className={btnclasses.loginbtn} type="submit">Log in</FormBtn>
                </div>
            </form>
        </Fragment>
    );
};

export default LoginForm;