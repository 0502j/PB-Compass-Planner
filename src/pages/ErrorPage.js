import classes from './Protection.module.css';
import uolLogo from '../img/uolLogo.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return(
            <div className={classes.errorcontent}>
                <div className={classes.errorimg}>
                    <img alt="UOL logo" src={uolLogo}/>
                </div>
                <div className={classes.errortext}>
                    <h1>Oops!</h1>
                    <h2>Sorry, you cannot access this page right now.</h2>
                    <Link to='/'>Go back do login</Link>
                </div>
            </div>
    );
}

export default ErrorPage;