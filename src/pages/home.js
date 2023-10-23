import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/home.css';

/**
 * This class provides the Home page component before the user is signed in to App.js.
 * @class
 * @version 0.1
 * @see react
 * @see styles/home.css
 * @see react-router-dom
 * @see Modules/Auth
 * @see Classes/App
 */
const Home = () => {
  const { user } = useAuth();

  /**
   * if user is not null, navigate user to /dashboard
   */
  if (user) {
    console.log(user.userType);
    if (user.userType === 'superAdmin'){
      return <Navigate to='/super-admin' />;
    } else if (user.userType === 'admin'){
      return <Navigate to='/admin' />;
    }else {
      return <Navigate to='/dashboard' />;
    }
  }

  /**
   * This function provides the HTML formatting for the home page to App.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <>
      <div className='home-container homepage-bgimage'>
        <div className='welcome-container'>
          <div className='welcomeMessageTitle'>Jobs4Interns</div> <br />
          <hr />
          <div className='welcomeMessage'>
            A place where students and businesses meet.
          </div>{' '}
          <br />
          <br />
          <Link to='./registration'>
            <button className='homeButton>'>Sign Up Now!</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
