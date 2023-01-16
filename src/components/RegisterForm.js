import classes from '../css-components/RegisterForm.module.css';

const Form = () => {
    return(
        <form className={classes.registerform}>
            <div className={classes.inputdiv}>
                <label htmlFor='firstname'>first name</label>
                <input type="text" id="firstname" placeholder="Your first name"/>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='lastname'>last name</label>
                <input type="text" id="lastname" placeholder="Your last name"/>
            </div>
           
            <div className={classes.inputdiv}>
                <label htmlFor='date'>birth date</label>
                <input type="date" id="date" placeholder="MM/DD/YY"/>     
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='countries'>country</label>
                <select id="countries">
                <option value="Your Country" disabled>Your Country</option>
                    <option value="Brasil">Brasil</option>
                </select>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='city'>country</label>
                <input type="text" id='city' placeholder="Your city"/>
            </div>
            
            <div className={classes.inputdiv}>
                <label htmlFor='email'>e-mail</label>
                <input type="email" id='email' placeholder="A valid e-mail here"/>
            </div>

            <div className={classes.inputdiv}>
                <label htmlFor='password'>password</label>
                <input type="password" id='password' placeholder="Your password"/>
            </div>

            <div className={classes.inputdiv}>
            <label htmlFor='confirmpass'>password</label>
            <input type="password" id="confirmpass" placeholder="Confirm your password"/>
            </div>
    
        </form>
    );
}

export default Form;