import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from './../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/profile.css'

import { useAlert } from 'react-alert'
import { logout } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'

const Profile = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, loading } = useSelector(state => state.auth)
    
    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }
    
    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />
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
                                    <div className="container">
                                        <div className="main-body">
                                            <div className="row gutters-sm">
                                                <div className="col-md-4 mb-3">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="d-flex flex-column align-items-center text-center">
                                                                <img src={user.avatar.url} alt="Admin" className="rounded-circle" width="100%" style={{minWidth: '100px', maxWidth: '150px'}}/>
                                                                <div className="mt-3">
                                                                    <h4>{user.name}</h4>
                                                                    <p className="text-secondary mb-1">{user.role}</p>
                                                                    <Link className="btn btn-dark btn-sm ml-3 mt-5" type="button" to="/admin/edit-profile">Edit Profile</Link>
                                                                    <Link className="btn btn-dark btn-sm ml-3 mt-5" type="button" to="/password/update">Change Password</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card mb-3">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <h6 className="mb-0">Full Name</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                    {user.name}
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <h6 className="mb-0">Email</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                    {user.email}
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <h6 className="mb-0">Phone</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                    {user.contactNumber}
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                    <h6 className="mb-0">Address</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                    {user.address}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
