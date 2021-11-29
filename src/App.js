import React ,{ useEffect, useState } from 'react';
import './styles/App.css'
import { BrowserRouter as Router} from 'react-router-dom'
import Navbar from "./components/UI/navbar/navbar";
import AppRouter from "./components/Approuter";
import { AuthContext } from "./context";

function App() {
  const [isAuthorizated, setIsAuthorizated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuthorizated(true)
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value ={{
      isAuthorizated,
      setIsAuthorizated,
      isLoading
    }}>
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </AuthContext.Provider>
  )
}

export default App;