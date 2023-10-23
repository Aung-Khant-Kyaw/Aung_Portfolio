import { Route, Routes } from 'react-router-dom';
import About from '../../pages/about';
import Login from '../../pages/login';
import ForgotPassword from '../../pages/forgotPassword';
import ForgotUsername from '../../pages/forgotUsername';
import ResetPassword from '../../pages/resetPassword';
import Notifications from '../../pages/notifications';
import Donate from '../../pages/donate';
import Dashboard from '../../pages/dashboard';
import SuperAdmin from '../../pages/admin/superAdmin'
import Admin from '../../pages/admin/adminDashboard'
import RegisterAdmin from '../../pages/admin/registerAdmin'
import FaqPage from '../../pages/faqPage';
import Contact from '../../pages/contact';
import Messages from '../../pages/messages';
import Registration from '../../pages/registration';
import ConfirmationCode from '../../pages/confirmationCode';
import ConfirmationPage from '../../pages/confirmationPage';
import ViewJobPosting from '../../pages/viewJobPosting';
import ApplytoJob from '../../pages/applyToJob';
import ProfileStudent from '../../pages/student/profileStudent';
import ApplyToJob from '../../pages/student/applyToJob';
import ProfileBusiness from '../../pages/business/profileBusiness';
import Register from '../../pages/register';
import AdminUserControls from '../../pages/admin/adminUserControls';
import AdminReviews from '../../pages/admin/adminReviews';
import AdminJobPostings from '../../pages/admin/adminJobPostings';
import AdminSecurity from '../../pages/admin/adminSecurity';
import SuccessfulUser from '../../pages/successfulUser';
import Layout from '../Layout';
import ProtectedRoutes from './ProtectedRoutes';

/**
 * This component provides the client side application overall functions and application formatting container
 * @class
 * @version 0.1
 * @see Modules/Users[api]
 * @see react
 * @see react-router-dom
 * @see Modules/ScrollToTop
 * @see Functions/Layout
 * @see Functions/Navbar
 * @see Modules/Footer
 * @see Functions/Home
 * @see Functions/About
 * @see Functions/Login
 * @see Functions/ForgotPassword
 * @see Functions/ResetPassword
 * @see Functions/Notifications
 * @see Functions/Donate
 * @see Functions/FaqPage
 * @see Functions/Contact
 * @see Functions/Messages
 * @see Functions/Registration
 * @see Functions/ConfirmationCode
 * @see Functions/ConfirmationPage
 * @see Functions/ViewJobPosting
 * @see Functions/ApplyToJob
 * @see Functions/ProfileStudent
 * @see Functions/Register
 * @see Functions/AdminUserControls
 * @see Functions/AdminReviews
 * @see Functions/AdminJobPostings
 * @see Functions/AdminSecurity
 * @see Functions/SuccessfulUser
 * @see react-dom
 */
const RouteHandlers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/forgot-username' element={<ForgotUsername />} />
        <Route exact path='/reset-password' element={<ResetPassword />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/about' element={<About />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/confirmation-code' element={<ConfirmationCode />} />
        <Route path='/confirmation-page' element={<ConfirmationPage />} />
        <Route path='/registration-student' element={<Register />} />
        <Route path='/view-job-posting' element={<ViewJobPosting />} />
        <Route path='/apply-job' element={<ApplytoJob />} />
        <Route path='/new-apply' element={<ApplyToJob />} />
        <Route path='/registration-business' element={<Register />} />
        <Route path='/registration-admin' element={<RegisterAdmin />} />
        <Route path='/successful' element={<SuccessfulUser />} />
        {/* Private/Protected Routes @TODO: add role-detection to protect routes based on users' roles*/}
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/super-admin' element={<SuperAdmin />} />
          <Route path='/admin' element={<Admin />} />

          {/* <Route path='/admin-reviews' element={<AdminReviews />} />
          <Route path='/admin-jobpostings' element={<AdminJobPostings />} />
          <Route path='/admin-security' element={<AdminSecurity />} /> */}
        </Route>
        {/*  Catch all routes that don't exist */}
        <Route path='*' element={<h1>404 Page Not Found</h1>} />
        {/* @TODO: Add 404 component */}
      </Route>
    </Routes>
  );
};

export default RouteHandlers;
