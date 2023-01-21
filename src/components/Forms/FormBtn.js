const FormBtn = (props) => {
    return(
        <div>
            <button onClick={props.onClick} className={props.className} type={props.type}>{props.children}</button>
        </div>
    );
}

export default FormBtn;