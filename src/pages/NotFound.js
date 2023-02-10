import classes from './Protection.module.css';
import uolLogo from '../img/uolLogo.png';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return(
            <div className={classes.errorcontent}>
                <div className={classes.errorimg}>
                    <img alt="UOL logo" src={uolLogo}/>
                </div>
                <div className={classes.errortext}>
                    <h1>404</h1>
                    <h2>The page you're looking for does not exist.</h2>
                    <Link to='/'>Go back do login</Link>
                </div>
            </div>
    );
}

export default NotFound;