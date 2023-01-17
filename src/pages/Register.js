import classes from './pages-css/IntroSection.module.css';
import img from '../img/background.png';
import {Fragment} from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';
import IntroSection from '../components/IntroSection';

const Register = () => {
    return(

        <Fragment>
            
            <IntroSection>
                <h1>Welcome,</h1>
                <h2>Please, register to continue</h2>
                <RegisterForm/>
                <Link to='/login'>Already have an account? Sign in.</Link>
            </IntroSection>

        </Fragment>

    );
};

export default Register;