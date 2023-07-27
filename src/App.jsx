import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useAuth } from "./hooks/auth/useAuth";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const { checkLoginStatus } = useAuth()
  const { loading } = useSelector(state => state.loading)

  useEffect(() => {
    checkLoginStatus()
  }, [])
  
  return (
    <>
      <ToastContainer />
      {
        loading ?
        (
          <div>Loading...</div>
        )
        :
        (
          <Router />
        )
      }
    </>
    
  );
}

export default App;
