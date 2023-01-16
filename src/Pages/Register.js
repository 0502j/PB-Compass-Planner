import classes from './pages-css/Register.module.css';
import img from '../img/background.png';

const Register = () => {
    return(
        <div className={classes.registermain}>
            <div className={classes.introtext}>
                <h1>Welcome,</h1>
                <h2>Please, register to continue</h2>
            </div>
            <div className={classes.registerimg}>
                <img src={img}/>
            </div>
        </div>
    );
};

export default Register;