import classes from './pages-css/Dashboard.module.css';
import { AuthContext } from '../store/user-context';
import { useEffect, useContext } from 'react';
import Header from '../components/Header/Header';
import ErrorPage from './ErrorPage';
import AddMeeting from '../components/Meetings/AddMeeting';

const Dashboard = () => {

    //Render different content based on useContext info
 
    const {isLogged, setIsLogged} = useContext(AuthContext);
    let loginHandler;

    useEffect(()=>{
        loginHandler = setIsLogged(localStorage.getItem("IsLoggedIn"));
    },[setIsLogged]);

    useEffect(()=>{
        localStorage.setItem("IsLoggedIn", isLogged);
    },[isLogged]);

    const loggedcontent = (<div>
        <Header/>
        <AddMeeting/>
        </div>);
    const errorcontent = (<ErrorPage/>);
    const content = (loginHandler ? loggedcontent : errorcontent);

    return(
        <div className={classes.dashboardcontent}>
            {content}
        </div>
    );
};

export default Dashboard;