import classes from './pages-css/Dashboard.module.css';
import { AuthContext } from '../store/user-context';
import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';

const Dashboard = () => {

    //render different content based on useContext info
    const {isLogged, setIsLogged} = useContext(AuthContext);
    const loggedcontent = (<div><Header></Header></div>);
    const content = isLogged ? loggedcontent : <h1>Not allowed!</h1>

    return(
        <div>
            {content}
        </div>
    );
};

export default Dashboard;