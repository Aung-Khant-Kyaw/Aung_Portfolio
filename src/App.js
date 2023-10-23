import { Fragment, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import RouteHandlers from './components/routing/RouteHandlers';
import './styles/App.css';
import useAuth from './hooks/useAuth';

/**
 * This component is the main root of the whole application
 * @version 0.1
 * @component
 * @see BrowserRouter
 * @see Routes
 * @see Route
 * @see NavBar
 * @see Footer
 * @see Home
 * @see RouteHandlers - contains all the child components
 * @see AuthProvider - context API to request global authenticated user state
 * @see styles/App.css
 */
const App = () => {
  /**
   * Import loadUser function from global context API
   */
  const { loadUser } = useAuth();

  /**
   * retrive user every time App component renders
   */
  useEffect(() => {
    (async () => {
      await loadUser();
    })();
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/*' element={<RouteHandlers />} />
          </Routes>
          <Footer />
        </Fragment>
      </BrowserRouter>
    </div>
  );
};

export default App;
