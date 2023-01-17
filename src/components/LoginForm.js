import {Fragment} from 'react';
import Input from '../components/Input';
import classes from '../css-components/Form.module.css';
import FormBtn from '../components/FormBtn';
import btnclasses from '../css-components/FormBtn.module.css';

//Class control
// const inputClasses = inputValid ? classes['forminput'] : classes['inputerror'];
const inputClasses = classes['forminput'];

const submitHandler = (event) => {
    event.preventDefault();

    



}


const LoginForm = () => {
    return(
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className={classes.loginformdiv}>
                    <h3 className={classes.logintitle}>Login</h3>
                    <div className={classes.inputdiv}>
                        <Input className={inputClasses} type="text" id="username" placeholder="user name"/>
                    </div>
                    <div className={classes.inputdiv}>
                        <Input className={inputClasses} type="text" id="password" placeholder="password"/>
                    </div>
                    <FormBtn className={btnclasses.loginbtn} type="submit">Log in</FormBtn>
                </div>
            </form>
        </Fragment>
    );
};

export default LoginForm;