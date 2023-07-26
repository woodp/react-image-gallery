import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useAuth } from "./hooks/auth/useAuth";
import Router from "./Router";
import { ToastContainer } from "react-toastify";

function App() {
  const { checkLoginStatus } = useAuth()

  useEffect(() => {
    checkLoginStatus()
  }, [])
  
  return (
    <>
      <ToastContainer />
      <Router />
    </>
    
  );
}

export default App;
