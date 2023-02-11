import classes from "./Form.module.css";
import btnclasses from "./FormBtn.module.css";
import FormBtn from "./FormBtn";
import { useContext, useEffect, useState } from "react";
import {
  validateEmail,
  validateName,
  validateLastName,
  validatePasword,
  validateCity,
  validateCountry
} from "../../utils/Regex";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { AuthContext } from "../../store/user-context";

const Form = () => {
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(AuthContext);
  setIsLogged(false);

  const [userInput, setUserInput] = useState({
    enteredFirstName: "",
    enteredLastName: "",
    enteredBirth: "",
    enteredCountry: "",
    enteredCity: "",
    enteredEmail: "",
    enteredPassword: "",
    enteredPasswordConfirm: "",
  });

  const [inputValid, setInputValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    //validation
    if (
      !validateName.test(userInput.enteredFirstName) ||
      !validateLastName.test(userInput.enteredLastName) ||
      !validateEmail.test(userInput.enteredEmail) ||
      !validatePasword.test(userInput.enteredPassword) ||
      !validateCity.test(userInput.enteredCity) ||
      !validateCountry.test(userInput.enteredCountry) ||
      userInput.enteredCity === "" ||
      userInput.enteredBirth === "" ||
      userInput.enteredCountry === ""
    ) {
      alert(
        "Hints:" +
          "\n" +
          "\n - Name and city must not have numbers" +
          "\n - Country must not be empty & in english" +
          "\n - E-mail must contain @ and ." +
          "\n - Password must contain at least 8 chars and 1 number"
      );
      setInputValid(false);
    } else if (userInput.enteredPassword !== userInput.enteredPasswordConfirm) {
      alert("Passwords do not match.");
    } else {
      navigate("/");
    }
  };

  const nameChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredFirstName: event.target.value,
    });
  };

  const lastNameChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredLastName: event.target.value,
    });
  };

  const birthChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredBirth: event.target.value,
    });
  };

  const countryChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredCountry: event.target.value,
    });
  };

  const cityChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredCity: event.target.value,
    });
  };

  const emailChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredEmail: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredPassword: event.target.value,
    });
  };

  const passwordConfirmChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredPasswordConfirm: event.target.value,
    });
  };

  //Adding data to localstorage
  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userInput));
  }, [userInput]);

  //Class control
  const inputClasses = inputValid
    ? classes["forminput"]
    : classes["inputerror"];
  const selectClasses = inputValid
    ? classes["selectform"]
    : classes["selecterror"];

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.inputdiv}>
        <label htmlFor="firstname">first name</label>
        <Input
          onChange={nameChangeHandler}
          className={inputClasses}
          type="text"
          id="firstname"
          placeholder="Your first name"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="lastname">last name</label>
        <Input
          onChange={lastNameChangeHandler}
          className={inputClasses}
          type="text"
          id="lastname"
          placeholder="Your last name"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="date">birth date</label>
        <Input
          onChange={birthChangeHandler}
          className={inputClasses}
          id="date"
          type="date"
          placeholder="MM/DD/YYYY"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="country">country</label>
        <Input
          onChange={countryChangeHandler}
          className={inputClasses}
          type="text"
          id="country"
          placeholder="Your country"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="city">city</label>
        <Input
          onChange={cityChangeHandler}
          className={inputClasses}
          type="text"
          id="city"
          placeholder="Your city"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="email">e-mail</label>
        <Input
          onChange={emailChangeHandler}
          className={inputClasses}
          type="email"
          id="email"
          placeholder="A valid e-mail here"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="password">password</label>
        <Input
          onChange={passwordChangeHandler}
          className={inputClasses}
          type="password"
          id="password"
          placeholder="Your password"
        />
      </div>

      <div className={classes.inputdiv}>
        <label htmlFor="confirmpass">password</label>
        <Input
          onChange={passwordConfirmChangeHandler}
          className={inputClasses}
          type="password"
          id="confirmpass"
          placeholder="Confirm your password"
        />
      </div>

      {!inputValid ? (
        <p className={classes.inputinvalid}>
          Invalid credentials. Please try again!
        </p>
      ) : (
        ""
      )}

      <FormBtn className={btnclasses.btn} type="submit">
        Register Now
      </FormBtn>
    </form>
  );
};

export default Form;
