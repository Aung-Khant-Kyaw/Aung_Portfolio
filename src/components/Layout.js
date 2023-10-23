/**
 * This module provides the layout for the whole application
 * @module Layout
 * @version 0.1
 * @see react-router-dom
 * @see Outlet - Outlet represents all the children component which we pass through in App.js
 */
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layout;
