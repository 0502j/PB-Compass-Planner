import classes from './pages-css/Dashboard.module.css';
import { AuthContext } from '../store/user-context';
import { useState, useEffect, useContext } from 'react';

const Dashboard = () => {

    //render different content based on useContext info
    const {isLogged, setIsLogged} = useContext(AuthContext);
    const content = isLogged ? <h1>Welcome to the dashboard!</h1> : <h1>Not allowed!</h1>

    return(
        <div>
            {content}
        </div>
    );
};

export default Dashboard;