import { Link } from 'react-router-dom'
import '../../CSS/HeaderMenu.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserForm from '../users/login/UserForm'
const apiUrl = process.env.REACT_APP_API_URL

const HeaderMenu = ({ userData, setUserData }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate()
  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    setUserData({
      token: null,
      username: null,
      userId: null
    })
    // navigate('/', { replace: true })
    navigate('../', { replace: true })
  }

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
    try {
      const response = await fetch(`${apiUrl}/user/login`, options)
      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.data);
      setUserData({ ...data, token: data.data });
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className='menu-container default-foreground menu-color'>
      <h3 ><Link to='/' className={`link-no-decoration ${window.location.pathname === '/' ? 'active' : ''}`}>Homepage</Link></h3>
      <h3><Link to='/project' className={`link-no-decoration ${window.location.pathname === '/project' ? 'active' : ''}`}>Projects</Link></h3>
      <h3><Link to='/games' className={`link-no-decoration ${window.location.pathname === '/games' ? 'active' : ''}`}>Games</Link></h3>
      <div>
        <h3 className='profile-link' onClick={() => setShowDropdown(!showDropdown)}>
          {userData.token !== null ? "Profile" : "Login"}
        </h3>
        <div className={`dropdown-container ${showDropdown ? 'open' : ''}`}>
          {userData.token !== null ? (
            <>
              <p>{userData.username}</p>
              <Link to='/account'>My account</Link>
              <Link to='/logout' onClick={handleLogout}>Log out</Link>
            </>
          ) : (
            <div className='left-aligned'>
              <UserForm handleSubmit={handleLogin} />
              <Link to='/register'>You don't have an account? Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default HeaderMenu;