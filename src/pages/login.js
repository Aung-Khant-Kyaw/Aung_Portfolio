import { useState } from 'react';
import '../styles/forms.css';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import { encrypt } from '../utils/encryption';
import useAuth from '../hooks/useAuth';

/**
 * This function provides the HTML formatting for the login component.
 * @class
 * @version 0.1
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Function/App
 * return JSX component
 */
const Login = () => {
  const { user, loadUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'; // after user login, route user to where they came `from` otherwise '/'
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { username, password } = formData;

  /**
   * If a user is defined, route the user back to home component.
   * Do not allow user to reach /login after login
   */
  if (user) {
    if (user.userType === 'superAdmin'){
      return <Navigate to='/super-admin' />;
    } else if (user.userType === 'admin'){
      return <Navigate to='/admin' />;
    }else {
      return <Navigate to={from} replace />;
    }
  }

  /**
   * This function delay the next function.
   * @function
   */
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  /**
   * This function handles the onChange event attribute of the text fields by updating the state to track user input.
   * @function
   * @param {Event} event - Event from the onChange attribute
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * This function handles the login function
   * @function
   * @async
   * @param {Event} event - The event from the log out button
   */
  const handleLogin = async (username, password) => {
    const httpOptions = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: encrypt(password, username),
      }),
    };

    try {
      const respond = await fetch(
        `${process.env.REACT_APP_API}/api/users/login`,
        httpOptions
      );

      const result = await respond.json();

      if (result.role === 'Error') {
        toastFail(result.error);
        /**
         * If a password is expired, route the user to resetPassword page.
         * Do not allow user to reach /login after login
         */
        if (result.error === 'Your password has expired!'){
          await delay(1000);
          toastFail("You will be redirected to reset password.")
          await delay(2000);
          let link = "/reset-password?token=TOKEN";
          link = link.replace('TOKEN', result.token);
          navigate(link);
        }
        return false;
      } else {
        // If the expired in less than 10 days, notify
        if (result.role === 'Expiration'){
          toastInfo(result.expiration);
          await delay(2000);
        }
        localStorage.setItem(
          'J4I-token',
          JSON.stringify({
            ID: result.ID,
          })
        );
        localStorage.setItem('J4I-isAuthenticated', true);
        await loadUser();
        navigate(from, { replace: true });
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * This function handles the onSubmit event attribute of the submit button by calling the handleLogin function from App.js
   * @function
   * @see Classes/App/handleLogin()
   * @param {Event} event - Event from the onSubmit attribute
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Sign In</h1>
        <hr />

        <form className='fields' onSubmit={(e) => handleSubmit(e)}>
          <label>
            Username:
            <input
              value={username}
              id='username'
              type='text'
              required
              onChange={(e) => handleChange(e)}
            />
          </label>

          <label>
            Password:
            <input
              value={password}
              id='password'
              type='password'
              required
              onChange={(e) => handleChange(e)}
            />
          </label>
          <Link to='/forgot-username'>Forgot Username?</Link>
          <br />
          <Link to='/forgot-password'>Forgot Password?</Link>
          <br />
          <Link to='/registration'>Sign Up</Link>
          <div className='button-container-bottom'>
            <Link to='/'>
              {' '}
              <button className='button-back' type='button'>
                Back
              </button>
            </Link>
            <a>
              <button className='button-back' type='submit'>
                Login
              </button>
            </a>

          </div>
        </form>
        <ToastContainer position='bottom-right' hideProgressBar={false} />
      </div>
    </div>
  );
};

export default Login;
