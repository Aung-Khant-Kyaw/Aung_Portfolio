import { createContext, useReducer } from 'react';
import authReducer, { initialState } from '../reducer/authReducer';
import axios from 'axios';
/**
 * This component helps manage User states globally
 * @function
 * @version 0.1
 * @see Functions/App
 * @see createContext
 * @see useState
 * @see useEffect
 * @see Modules/Auth
 */
export const AuthContext = createContext({ initialState });

/**
 * This component provides a UserProvider which used in index.js to wrapper the whole application to
 * distribute global user states
 * @param children - Every props passed in
 */
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Load user from database using J4I-token retrieved from localStorage.
   * Dispatches "USER_LOADED" action in useReducer to store user in global state
   */
  const loadUser = async () => {
    let token = JSON.parse(localStorage.getItem('J4I-token'));
    if (token === null) {
      return false;
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/users/${token.ID}`
        );

        dispatch({
          type: 'USER_LOADED',
          payload: {
            user: data,
          },
        });
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  /**
   * Log user out.
   * Dispatches "USER_LOGOUT" action in useReducer to remove "J4I-token" and "J4I-isAuthenticated" from localStorage, set state to initalState
   */
  const logout = () => {
    dispatch({
      type: 'USER_LOGOUT',
    });
  };

  const getUser = async () => {
    let token = JSON.parse(localStorage.getItem('J4I-token'));
    if (token === null) {
      return false;
    } else {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/users/${token.ID}`
        );

        return data;
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  /**
   * Auth Context Provider exports values of
   * @user
   * @isAuthentication
   * @loadUser - Function
   * @logout - Function
   * @return Context Provider
   */
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loadUser,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
