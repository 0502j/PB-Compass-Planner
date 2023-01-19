import classes from './pages-css/Dashboard.module.css';
import { AuthContext } from '../store/user-context';
import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import ErrorPage from './ErrorPage';

const Dashboard = () => {

    //render different content based on useContext info
    const {isLogged, setIsLogged} = useContext(AuthContext);
    const loggedcontent = (<div><Header/></div>);
    const errorcontent = (<ErrorPage/>);
    const content = isLogged ? loggedcontent : errorcontent

    return(
        <div>
            {content}
        </div>
    );
};

export default Dashboard;