import classes from './pages-css/ErrorPage.module.css';
import uolLogo from '../img/uolLogo.png';

const ErrorPage = () => {
    return(
            <div className={classes.errorcontent}>
                <div className={classes.errorimg}>
                    <img src={uolLogo}/>
                </div>
                <div className={classes.errortext}>
                    <h1>Oops!</h1>
                    <h2>Sorry, you cannot access this page right now.</h2>
                </div>
            </div>
    );
}

export default ErrorPage;