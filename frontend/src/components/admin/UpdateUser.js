import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'


const UpdateUser = ({ match, history }) => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [role, setRole] = useState([]);
    const [address, setAddress] = useState('');

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, user } = useSelector(state => state.getUser)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.updateUser);

    const userId = match.params.id

    const [isToggled, setToggled] = useState('false')
    
    const roles = [
        'admin',
        'superadmin'
    ]

    const handleToggle = () => {
        setToggled(!isToggled)
    }

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => {

        if(user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        }
        else { 
            setName(user.name)
            setContactNumber(user.contactNumber)
            setRole(user.role)
            setAddress(user.address)
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated) {
            history.push('/');
            alert.success('User updated successfully.')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, user, userId, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('contactNumber', contactNumber);
        formData.set('address', address);
        formData.set('role', role);

        dispatch(updateUser(user._id, formData));
    }
    
    return (
        <Fragment>
            <MetaData title={'Update User'}/>
            <div id="wrapper" className={isToggled ? "toggled" : null} style={{paddingTop: '11px'}}>
                <div id="sidebar-wrapper" style={{"background": "var(--gray-dark)", "color": "var(--white)"}}>
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">Agile Technodynamics</li>
                        <li> <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                        <li> <Link to="/admin/me"><i className="fa fa-user"></i> My Profile</Link></li>
                        <li> <Link to="/"><i className="fa fa-home"></i> Agile Homepage</Link></li>
                        <li> <Link to="/admin/products"><i className="fa fa-shopping-bag"></i> Products</Link></li>
                        <hr/>
                        <li> <Link to="/admin/users"><i className="fa fa-user"></i> Users</Link></li>
                        <li> <Link to="/register"><i className="fa fa-user"></i> Register</Link></li>
                        <hr/>
                        <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                        <li></li>
                    </ul>
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <Fragment>
                        <div className="login-clean">
                            <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} style={{marginTop: '-150px', position: 'fixed'}}>
                                <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                            </a>
                            <form method="put" onSubmit={submitHandler} encType='multipart/form-data' style={{maxWidth: '500px'}}>
                                <h2 className="sr-only">Update User</h2>
                                <div className="div-forgot-password">
                                    <h3 className="forgot-password-heading">Update User</h3>
                                </div>
                                <div className="form-group">
                                    <h6>Name</h6>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="name"
                                        value={name}
                                        style={{width: '100%'}}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Contact Number</h6>
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        name="contactNumber"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        height='55px'
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Address</h6>
                                    <textarea
                                        type="text" 
                                        className="form-control" 
                                        name="address"
                                        value={address}
                                        style={{width: '100%', height: '150px'}}
                                        onChange={(e) => setAddress(e.target.value)}
                                        height='55px'
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Role</h6>
                                    <div className="dropdown show">
                                        <select 
                                            name="role" 
                                            className="product-dropdown" 
                                            id="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            {roles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                        <button 
                                        className="btn btn-primary btn-block" 
                                        type="submit"
                                        disabled={loading ? true : false}
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                        </Fragment>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser
