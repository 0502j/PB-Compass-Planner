import classes from '../css-components/FormBtn.module.css';

const FormBtn = (props) => {
    return(
        <div className={classes.btndiv}>
            <button type={props.type}>{props.children}</button>
        </div>
    );
}

export default FormBtn;