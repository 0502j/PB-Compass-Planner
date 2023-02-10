import classes from './IntroSection.module.css';
import compassWhiteLogo from '../../img/compassWhiteLogo.svg';

const IntroSection = (props) => {
    
    return(
        <div className={classes.maincontent}>
            <div className={classes.introtext}>
                {props.children}
            </div>
            <div className={classes.laptopbackground}>
                <a href="https://compass.uol/en/home/"><img alt="Compass logo" className={classes.logoimg} src={compassWhiteLogo}/></a>
            </div>
        </div>
    );

};

export default IntroSection;