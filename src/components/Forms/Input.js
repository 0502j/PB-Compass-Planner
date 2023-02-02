import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div>
      <input
        ref={ref}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={props.className}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
});

export default Input;
