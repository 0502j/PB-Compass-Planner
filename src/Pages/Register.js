import classes from './pages-css/Register.module.css';
import img from '../img/background.png';
import {Fragment} from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

const Register = () => {
    return(
        <Fragment>
            <div className={classes.registermain}>
                <div className={classes.introtext}>
                    <h1>Welcome,</h1>
                    <h2>Please, register to continue</h2>
                    <RegisterForm/>
                    <Link to='/login'>Already have an account? Sign in.</Link>
                </div>
                <div className={classes.registerimg}>
                    <img src={img}/>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;