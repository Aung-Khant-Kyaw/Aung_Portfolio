import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import useAuth from '../hooks/useAuth';

/**
 * This class provides the formatting for the navigation bar component to App.js
 * @class
 * @version 0.1
 * @see react
 * @see react-router-dom
 * @see styles/Navbar.css
 * @see Classes/App
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * This function handles the log out action by removing the user token and sending them back to the home menu.
   * @function
   * @async
   * @param {Event} event - The event from the log out button
   */
  const handleLogout = (event) => {
    event.preventDefault();
    navigate('/dashboard');
    logout();
  };

  /**
   * This function provides the HTML formatting for the Navbar component to App.js
   * @function
   * @returns {HTMLCollection}
   * @see Function/App
   */
  return (
    <>
      <nav className='navbar'>
        <div>
          <NavLink to='/'>
            <img src='j4inologo.png' alt='RTI' />
          </NavLink>
        </div>
        <div className='menu-icon'>
          <i className='fas fa-times' />
        </div>
        <ul className='nav-menu active'>
          {/* Victoria commented this out 5/10/23, just until we figure out what it will be used for */}
          {/* <li className='nav-item'>
            <div className='searchBox'>
              <input type='text' placeholder='Search' />
              <NavLink to='./jobsearch'>
                <img src='./searchIcon.png' />
              </NavLink>
            </div>
          </li> */}
        </ul>
        <div className='navbar-user'>
          {user && (
            <div className='nav-welcome'>
              <NavLink to='/' style={{ textDecoration: 'none' }}>
                <div className='welcome-text'>Welcome,</div>
              </NavLink>
              <NavLink to='/' style={{ textDecoration: 'none' }}>
                <div className='username'>{user.username}</div>
              </NavLink>
            </div>
          )}
          {user ? (
            <button className='logout-btn' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to='/login'>
              <button className='login-btn'>Login</button>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
