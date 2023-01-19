import classes from './pages-css/Dashboard.module.css';
import { AuthContext } from '../store/user-context';
import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import ErrorPage from './ErrorPage';
import AddMeeting from '../components/AddMeeting';
import DaysOfWeek from '../components/DaysOfWeek';

const Dashboard = () => {

    //render different content based on useContext info
    const {isLogged, setIsLogged} = useContext(AuthContext);
    const loggedcontent = (<div>
            <Header/>
            <AddMeeting/>
            <DaysOfWeek/>
            </div>);
    const errorcontent = (<ErrorPage/>);
    const content = isLogged ? loggedcontent : errorcontent

    return(
        <div className={classes.dashboardcontent}>
            {content}
        </div>
    );
};

export default Dashboard;