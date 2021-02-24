import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import '../../css/bootstrap.min.css'
import '../../css/dashboard.css'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import { updatePassword, clearErrors } from './../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'
import { Link } from 'react-router-dom'

const UpdatePassword = ( { history }) => {
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user);
    const [isToggled, setToggled] = useState('false')
    const { user } = useSelector(state => state.auth)

    const handleToggle = () => {
        setToggled(!isToggled)
    }
    
    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }
    
    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }

        if(isUpdated){
            alert.success('Password updated successfully');

            history.push('/admin/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('newPassword', newPassword);

        dispatch(updatePassword(formData));
    }

    return (
        <Fragment>
            <MetaData title={'Change Password'}/>
            <div id="wrapper" className={isToggled ? "toggled" : null} style={{paddingTop: '11px'}}>
                <div id="sidebar-wrapper" style={{"background": "var(--gray-dark)", "color": "var(--white)"}}>
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">Agile Technodynamics</li>
                        <li> <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                        <li> <Link to="/admin/me"><i className="fa fa-user"></i> My Profile</Link></li>
                        <li> <Link to="/"><i className="fa fa-home"></i> Agile Homepage</Link></li>
                        <li> <Link to="/admin/products"><i className="fa fa-shopping-bag"></i> Products</Link></li>
                        <hr/>
                        {user && user.role !== 'admin' ? (
                                <Fragment>
                                    <li> <Link to="/admin/users"><i className="fa fa-user"></i> Users</Link></li>
                                    <li> <Link to="/register"><i className="fa fa-user"></i> Register</Link></li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <li> <Link to="/admin/inquiries"><i className="fa fa-envelope"></i> Inquiries</Link></li>
                                    <li> <Link to="/admin/appointments"><i className="fa fa-archive"></i> Appointment</Link></li>
                                    <li> <Link to="/admin/others"><i className="fa fa-inbox"></i> Other Concerns</Link></li>
                                    <hr/>
                                    <li> <Link to="/admin/archives"><i className="fa fa-envelope-open"></i> Archives</Link></li>
                                    <li> <Link to="/admin/trash"><i className="fa fa-trash"></i> Trash</Link></li>
                                </Fragment>
                            )}

                        <hr/>
                        <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                        <li></li>
                    </ul>
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} style={{position: 'fixed'}}>
                            <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                        </a>
                        <div className="login-clean" style={{paddingTop: '65px'}}>
                            <form method="post" onSubmit={submitHandler}>
                                <h2 className="sr-only">New Password</h2>
                                <div className="div-forgot-password">
                                    <h3 className="forgot-password-heading">New Password</h3>
                                </div>
                                <div className="form-group">
                                    <h6>Old Password</h6>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>New Password</h6>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        disabled={ loading ? true : false}
                                    >Update Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
