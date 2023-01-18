
const Input = (props) => {
    return(
        <div>
            <input onFocus={props.onFocus} onBlur={props.onBlur} onChange={props.onChange} className={props.className} type={props.type} id={props.id} placeholder={props.placeholder}/>
        </div>
    );
}
export default Input;