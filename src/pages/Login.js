import classes from './pages-css/Login.module.css';
import {Fragment} from 'react';
import IntroSection from '../components/Header/IntroSection';
import LoginForm from '../components/Forms/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <Fragment>
            <IntroSection>
                <div className={classes.loginintrotxt}>
                    <h1>Welcome,</h1>
                    <h2>To continue browsing safely, log in to the network.</h2>
                </div>
                <LoginForm></LoginForm>
                <Link to='/register'>New here? Create an account.</Link>
            </IntroSection>
        </Fragment>
    );
};

export default Login;