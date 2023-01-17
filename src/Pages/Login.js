import classes from './pages-css/Login.module.css';
import {Fragment} from 'react';
import IntroSection from '../components/IntroSection';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return(
        <Fragment>
            <IntroSection>
                <div className={classes.loginintrotxt}>
                    <h1>Welcome,</h1>
                    <h2>To continue browsing safely, log in to the network.</h2>
                </div>
                <LoginForm></LoginForm>
            </IntroSection>
        </Fragment>
    );
};

export default Login;