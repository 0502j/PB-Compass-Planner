import classes from '../css-components/FormBtn.module.css';

const FormBtn = (props) => {
    return(
        <div>
            <button className={props.className} type={props.type}>{props.children}</button>
        </div>
    );
}

export default FormBtn;