import classes from './IntroSection.module.css';
import { Link } from 'react-router-dom';
import IntroSection from './IntroSection';
import RegisterForm from '../components/Forms/RegisterForm';

const Register = () => {
    return(
            <IntroSection>
                <div className={classes.registerdiv}>
                    <div className={classes.registertxt}>
                        <h1>Welcome,</h1>
                        <h2>Please, register to continue</h2>
                    </div>
                    <RegisterForm/>
                    <Link to='/'>Already have an account? Sign in.</Link>
                </div>
            </IntroSection>
    );
};

export default Register;