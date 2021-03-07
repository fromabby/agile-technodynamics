import { BrowserRouter as Router, Route } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import "@fortawesome/fontawesome-free/css/all.min.css";

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Products from './components/Products'

import ProductsOthers from './components/ProductsOthers'
import ProductsDC from './components/ProductsDC'
import ProductsEEE from './components/ProductsEEE'
import ProductsME from './components/ProductsME'
import ProductsTE from './components/ProductsTE'

import ProductDetails from './components/product/ProductDetails'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import ConfirmationPage from './components/ConfirmationPage'

import UpdateHome from './components/admin/UpdateHome'
import UpdateAbout from './components/admin/UpdateAbout'
import UpdateFooter from './components/admin/UpdateFooter'

import Login from './components/user/Login'
import Register from './components/user/Register'
import RegisterSuccess from './components/user/RegisterSuccess'
import RegisterError from './components/user/RegisterError'
import Profile from './components/admin/Profile'
import UpdateProfile from './components/admin/UpdateProfile'
import UpdatePassword from './components/admin/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import EmailSent from './components/EmailSent'

import Dashboard from './components/admin/Dashboard'
import ListInquiries from './components/admin/ListInquiries'
import ListAppointments from './components/admin/ListAppointments'
import ListOthers from './components/admin/ListOthers'
import ListArchives from './components/admin/ListArchives'
import ListTrash from './components/admin/ListTrash'
import ListAbout from './components/admin/ListAbout'
import ListHome from './components/admin/ListHome'
import ListFooter from './components/admin/ListFooter'
import ListServices from './components/admin/ListServices'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import UpdateInquiry from './components/admin/UpdateInquiry'
import UpdateServices from './components/admin/UpdateServices'

import ListSuperAdmins from './components/admin/ListSuperAdmins'
import ListAdmins from './components/admin/ListAdmins'
import UpdateUser from './components/admin/UpdateUser'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  const { loading, isAuthenticated, user } = useSelector(state => state.auth);
  const { isDashboard }  = useSelector(state => state.dashboard);

  return (
    <Router>
        <div className="App">
                {!loading && !isDashboard && (
                    <Header/>
                )}
                <Route path='/' component={Home} exact/>

                <Route path={['/products/our-products', '/our-products']} component={Products} exact/>
                <Route path='/products/Mechanical Engineering' component={ProductsME} exact/>
                <Route path='/products/DC Power Systems' component={ProductsDC} exact/>
                <Route path='/products/Electrical Engineering Equipment' component={ProductsEEE} exact/>
                <Route path='/products/Test Equipment' component={ProductsTE} exact/>
                <Route path='/products/Others' component={ProductsOthers} exact/>

                <Route path='/our-products/:id' component={ProductDetails} exact/>

                <Route path='/about-us' component={About} exact/>
                <Route path='/our-services' component={Services} exact/>
                <Route path='/contact-us' component={Contact} exact/>
                <Route path='/confirmation' component={ConfirmationPage} exact/>
                <Route path='/register-success' isSuperAdmin={true} component={RegisterSuccess} exact/>
                <Route path='/register-error' isSuperAdmin={true} component={RegisterError} exact/>

                <ProtectedRoute path="/admin/me" forAdmins={true} component={Profile} exact/>
                <ProtectedRoute path="/admin/edit-profile" forAdmins={true} component={UpdateProfile} exact/>
                <ProtectedRoute path="/password/update" forAdmins={true} component={UpdatePassword} exact/>

                <Route path="/password/forgot" component={ForgotPassword} exact/>
                <Route path="/password/reset/:token" component={NewPassword} exact/>
                <Route path='/email-sent' component={EmailSent} exact/>

                <Route path='/login' component={Login} exact/>
                <ProtectedRoute path='/register' isSuperAdmin={true} component={Register} exact/>
                <ProtectedRoute path='/admin/users/superadmin' isSuperAdmin={true} component={ListSuperAdmins} exact/>
                <ProtectedRoute path='/admin/users/admin' isSuperAdmin={true} component={ListAdmins} exact/>
                <ProtectedRoute path="/superadmin/user/:id" isSuperAdmin={true} component={UpdateUser} exact/>
                
                <ProtectedRoute path="/admin/dashboard" forAdmins={true} component={Dashboard} exact/>
                <ProtectedRoute path="/admin/inquiries" isAdmin={true} component={ListInquiries} exact/>
                <ProtectedRoute path="/admin/appointments" isAdmin={true} component={ListAppointments} exact/>
                <ProtectedRoute path="/admin/others" isAdmin={true} component={ListOthers} exact/>
                <ProtectedRoute path="/admin/archives" isAdmin={true} component={ListArchives} exact/>
                <ProtectedRoute path="/admin/trash" isAdmin={true} component={ListTrash} exact/>
                
                <ProtectedRoute path="/admin/about" forAdmins={true} component={ListAbout} exact/>
                <ProtectedRoute path="/admin/about/:id" forAdmins={true} component={UpdateAbout} exact/>
                <ProtectedRoute path="/admin/service" forAdmins={true} component={ListServices} exact/>
                <ProtectedRoute path="/admin/service/:id" forAdmins={true} component={UpdateServices} exact/>
                <ProtectedRoute path="/admin/home" forAdmins={true} component={ListHome} exact/>
                <ProtectedRoute path="/admin/home/:id" forAdmins={true} component={UpdateHome} exact/>
                <ProtectedRoute path="/admin/footer" forAdmins={true} component={ListFooter} exact/>
                <ProtectedRoute path="/admin/update-footer" forAdmins={true} component={UpdateFooter} exact/>
                
                <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
                <ProtectedRoute path="/admin/newProduct" isAdmin={true} component={NewProduct} exact/>
                <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>
                <ProtectedRoute path="/admin/inquiry/:id" isAdmin={true} component={UpdateInquiry} exact/>
                
                {!loading && !isDashboard && (
                  <Footer/>
                )}
        </div>
    </Router>
  );
}

export default App;