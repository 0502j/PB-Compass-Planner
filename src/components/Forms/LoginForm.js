import { Fragment, useContext, useEffect, useState } from "react";
import Input from "../Forms/Input";
import classes from "./Form.module.css";
import FormBtn from "./FormBtn";
import btnclasses from "./FormBtn.module.css";
import { AuthContext } from "../../store/user-context";
import { useNavigate } from "react-router-dom";
import passwordIcon from "../../img/passwordIcon.svg";
import userIcon from "../../img/userIcon.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isUserActive, setIsUserActive] = useState(false);
  const [isPassActive, setIsPassActive] = useState(false);

  //Getting localstorage object data to validate info
  const data = window.localStorage.getItem("userdata");
  localStorage.setItem("userData", JSON.stringify(data));
  const parsedData = JSON.parse(data);

  //Storing parsedData into vars
  const firstName = parsedData
    ? parsedData.enteredFirstName.split(" ").join("")
    : "";
  const lastName = parsedData
    ? parsedData.enteredLastName.split(" ").join("")
    : "";
  const email = parsedData ? parsedData.enteredEmail : null;
  const password = parsedData ? parsedData.enteredPassword : null;
  const fullname = parsedData ? firstName + lastName : null;

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [dataMatch, setDataMatch] = useState(true);

  //Class control
  const inputClasses = dataMatch ? classes["forminput"] : classes["inputerror"];
  const userClasses = isUserActive
    ? classes["iconactive"]
    : classes["iconinactive"];
  const passwordClasses = isPassActive
    ? classes["iconactive"]
    : classes["iconinactive"];

  //Get useState data with adequate format
  const usernameString = JSON.stringify(enteredUsername);
  const usernameParse = JSON.parse(usernameString);
  const passwordString = JSON.stringify(enteredPassword);
  const passwordParse = JSON.parse(passwordString);

  //UseContext validation
  const { isLogged, setIsLogged } = useContext(AuthContext);

  useEffect(() => {
    if (isLogged == true) {
      navigate("/dashboard");
    }
  }, [setIsLogged, isLogged]);

  //Validation before login
  const submitHandler = (event) => {
    event.preventDefault();

    if (email == null || password == null || fullname == null) {
      localStorage.setItem("IsLoggedIn", false);
      setIsLogged(false);
      setDataMatch(false);
      return;
    } else if (
      (fullname === usernameParse.enteredUsername ||
        usernameParse.enteredUsername === email) &&
      password === passwordParse.enteredPassword
    ) {
      localStorage.setItem("IsLoggedIn", true);
      setIsLogged(true);
    } else {
      localStorage.setItem("IsLoggedIn", false);
      setDataMatch(false);
      setIsLogged(false);
    }
  };

  //Getting all user input
  const usernameChangeHandler = (event) => {
    setEnteredUsername({
      ...setEnteredUsername,
      enteredUsername: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword({
      ...setEnteredPassword,
      enteredPassword: event.target.value,
    });
  };

  //Icon animation handlers
  const userActiveHandler = () => {
    setIsUserActive(true);
  };

  const passwordActiveHandler = () => {
    setIsPassActive(true);
  };

  const inputInactiveHandler = () => {
    if (enteredUsername !== "") {
      setIsUserActive(true);
    } else {
      setIsUserActive(false);
    }

    if (enteredPassword !== "") {
      setIsPassActive(true);
    } else {
      setIsPassActive(false);
    }
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div className={classes.loginformdiv}>
          <h3 className={classes.logintitle}>Login</h3>
          <div className={classes.inputdiv}>
            <Input
              onBlur={inputInactiveHandler}
              onFocus={userActiveHandler}
              onChange={usernameChangeHandler}
              className={inputClasses}
              type="text"
              id="username"
              placeholder="username"
            />
            <img alt="User logo" className={userClasses} src={userIcon} />
          </div>
          <div className={classes.inputdiv}>
            <Input
              onBlur={inputInactiveHandler}
              onFocus={passwordActiveHandler}
              onChange={passwordChangeHandler}
              className={inputClasses}
              type="password"
              id="password"
              placeholder="password"
            />
            <img
              alt="User logo"
              className={passwordClasses}
              src={passwordIcon}
            />
          </div>
          {!dataMatch ? (
            <div className={classes.loginfail}>
              <p>Wow, invalid username or password.</p>
              <p>Please, try again!</p>
            </div>
          ) : (
            ""
          )}
          <FormBtn className={btnclasses.loginbtn} type="submit">
            Log in
          </FormBtn>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginForm;
