const DaySelect = (props) => {
    return(
        <select onChange={props.onChange} className={props.className}>
            <option selected disabled>Task day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
        </select>
    );
}

export default DaySelect;