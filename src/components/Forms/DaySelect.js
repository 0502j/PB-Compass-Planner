import { forwardRef } from "react";

const DaySelect = forwardRef((props, ref) => {
  return (
    <select ref={ref} onChange={props.onChange} className={props.className}>
      <option value="" selected disabled>
        Task day
      </option>
      <option value="monday">Monday</option>
      <option value="tuesday">Tuesday</option>
      <option value="wednesday">Wednesday</option>
      <option value="thursday">Thursday</option>
      <option value="friday">Friday</option>
      <option value="saturday">Saturday</option>
      <option value="sunday">Sunday</option>
    </select>
  );
});

export default DaySelect;
