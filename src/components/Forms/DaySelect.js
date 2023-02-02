import { forwardRef } from "react";

const DaySelect = forwardRef((props, ref) => {
  return (
    <select ref={ref} onChange={props.onChange} className={props.className}>
      <option value="" selected disabled>
        Task day
      </option>
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
    </select>
  );
});

export default DaySelect;
