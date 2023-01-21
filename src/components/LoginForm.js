import {Fragment, useContext, useEffect, useState} from 'react';
import Input from '../components/Input';
import classes from '../css-components/Form.module.css';
import FormBtn from '../components/FormBtn';
import btnclasses from '../css-components/FormBtn.module.css';
import { AuthContext } from '../store/user-context';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import passwordIcon from '../img/passwordIcon.svg';
import userIcon from '../img/userIcon.svg';

const LoginForm = () => {

    const navigate = useNavigate();
    const [isUserActive, setIsUserActive] = useState(false);
    const [isPassActive, setIsPassActive] = useState(false);

    //getting localstorage object data to validate info
    const data = window.localStorage.getItem("userdata");
    localStorage.setItem("userData", JSON.stringify(data));
    const parsedData = JSON.parse(data);
         
    //storing parsedData into vars
    const firstName = parsedData.enteredFirstName.split(' ').join('');
    const lastName = parsedData.enteredLastName.split(' ').join('');
    const email = parsedData.enteredEmail;
    const password = parsedData.enteredPassword;
    const fullname = firstName + lastName;
   
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [dataMatch, setDataMatch] = useState(true);

    //class control
    const inputClasses = dataMatch ? classes['forminput'] : classes['inputerror'];
    const userClasses = isUserActive ? classes['iconactive'] : classes['iconinactive'];
    const passwordClasses = isPassActive ? classes['iconactive'] : classes['iconinactive'];

    //get useState data with adequate format
    const usernameString = JSON.stringify(enteredUsername);
    const usernameParse = JSON.parse(usernameString);
    const passwordString = JSON.stringify(enteredPassword);
    const passwordParse = JSON.parse(passwordString);

    //useContext validation
    const {isLogged, setIsLogged} = useContext(AuthContext);
   

    useEffect(()=>{
        if(isLogged === true){
            localStorage.setItem("IsLoggedIn", true);
            navigate('/dashboard');
        }
    },[isLogged])

    const submitHandler = (event) => {
        event.preventDefault();
        
        if((fullname == usernameParse.enteredUsername ||
            usernameParse.enteredUsername === email) &&
            password == passwordParse.enteredPassword){
            setIsLogged(true);
        }else{
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

    const userActiveHandler = () => {
        setIsUserActive(true);
    }

    const passwordActiveHandler = () => {
        setIsPassActive(true);
    }


    const inputInactiveHandler = () => {
        if(enteredUsername != ''){
            setIsUserActive(true); 
        }else{
            setIsUserActive(false);
        }
        
        if(enteredPassword != ''){
            setIsPassActive(true); 
        }else{
            
            setIsPassActive(false);
        }
    }


    return(
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className={classes.loginformdiv}>
                    <h3 className={classes.logintitle}>Login</h3>
                    <div className={classes.inputdiv}>
                        <Input onBlur={inputInactiveHandler} onFocus={userActiveHandler} onChange={usernameChangeHandler} className={inputClasses} type="text" id="username" placeholder="username"/>
                        <img className={userClasses} src={userIcon}/>
                    </div>
                    <div className={classes.inputdiv}>
                        <Input onBlur={inputInactiveHandler} onFocus={passwordActiveHandler} onChange={passwordChangeHandler} className={inputClasses} type="password" id="password" placeholder="password"/>
                        <img className={passwordClasses} src={passwordIcon}/>
                    </div>
                    {!dataMatch ? <div className={classes.loginfail}>
                        <p>Wow, invalid username or password.</p>
                        <p>Please, try again!</p>
                    </div> : ''}
                    <FormBtn className={btnclasses.loginbtn} type="submit">Log in</FormBtn>
                </div>
            </form>
        </Fragment>
    );
};

export default LoginForm;