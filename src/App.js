import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthContext } from './store/user-context';
import { useState, useMemo } from 'react';
import NotFound from './pages/NotFound';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  const providerValue = useMemo(()=>(
    {isLogged, setIsLogged}
  ),[isLogged]);

  useEffect(()=>{
    if(localStorage.getItem('isLoggedIn')){
      setIsLogged(localStorage.setItem("isLoggedIn", isLogged));
    }else{
      localStorage.getItem("IsLoggedIn");
    }
  },[isLogged])


  return (
    <AuthContext.Provider value={{isLogged, setIsLogged}}>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
