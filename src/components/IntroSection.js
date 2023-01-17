import classes from '../pages/pages-css/IntroSection.module.css';
import img from '../img/background.png';

const IntroSection = (props) => {
    
    return(
        <div className={classes.registermain}>
            <div className={classes.introtext}>
                {props.children}
            </div>
            <div className={classes.registerimg}>
                <img src={img}/>
            </div>
        </div>
    );

};

export default IntroSection;