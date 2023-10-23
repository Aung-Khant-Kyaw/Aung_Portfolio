import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * This component expand react-router-dom Route to protect
 * the child components from unauthenticated users.
 * Protect all the child components passed in with the value of isAuthenticated being true.
 * Navigate users to /login if the user is not authenticated a.k.a not logged in.
 * @see useLocation - records location where user wanted to reach before get redirected to Login
 * @see Navigate
 * @see Outlet - represent any child component of the ProtectedRoutes
 * @see useAuth - context API to request global authenticated user state
 * @returns JSX component
 */
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  /**
   * Protect all the child components passed in with the value of isAuthenticated being true.
   * Navigate users to /login if the user is not authenticated a.k.a not logged in.
   */
  return isAuthenticated ? ( // @TODO add role/userType security
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace /> //state={{from: location}} records the location where user wanted to reach before get redirected to Login
  );
};

export default ProtectedRoutes;
