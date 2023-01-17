import './App.css';
import LoginPage from './components/users/login/LoginPage'
import Homepage from './components/Homepage'
import HeaderMenu from './components/header/HeaderMenu'
import Games from './components/Gamepage';
import Account from './components/users/login/Account';
import ProjectPage from './components/Projectpage';
import RegisterPage from './components/users/login/RegisterPage';
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

function App() {
  const [userData, setUserData] = useState(null)

  console.log(localStorage.getItem("token"))
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserData(localStorage.getItem("token"))
    }
  });

  console.log("App", userData)


  return (
    <div className='app-background'>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage userData={userData} setUserData={setUserData}/>} />
          <Route path="/project" element={<ProjectPage userData={userData} setUserData={setUserData}/>} />
          <Route path="/register" element={<RegisterPage userData={userData} />} name="register" />
          <Route path="/login" element={<LoginPage setUserData={setUserData} />} name="login" />
          <Route element={<AuthenticateUser />}>
            <Route path="/games" element={<Games userData={userData} setUserData={setUserData}/>} />
            <Route path="/account" element={<Account userData={userData} setUserData={setUserData}/>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token')
  return !(loadedToken === '')
}

const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}