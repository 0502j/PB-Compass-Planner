
const Input = (props) => {
    return(
        <div>
            <input onChange={props.onChange} className={props.className} type={props.type} id={props.id} placeholder={props.placeholder}/>
        </div>
    );
}
export default Input;