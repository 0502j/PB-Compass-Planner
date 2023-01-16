import classes from '../css-components/FormBtn.module.css';

const FormBtn = (props) => {
    return(
        <div className={classes.btndiv}>
            <button>{props.text}</button>
        </div>
    );
}

export default FormBtn;