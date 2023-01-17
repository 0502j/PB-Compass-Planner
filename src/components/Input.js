
const Input = (props) => {
    return(
        <div>
            <input className={props.className} type={props.type} id={props.id} placeholder={props.placeholder}/>
        </div>
    );
}
export default Input;