import React, { Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import '../../css/bootstrap.min.css'
import '../../css/dashboard.css'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'
import { listInquiry } from '../../actions/inquiryActions'
import { getUsers } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'

const Dashboard = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, products } = useSelector(state => state.products)
    const { users, adminCount, superadminCount } = useSelector(state => state.users)
    const { inquiryCount, appointmentCount, otherCount } = useSelector(state => state.listInquiry)
    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }
    
    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(listInquiry())
        dispatch(getUsers())

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])
    
    console.log(inquiryCount)
    
    return (
        <Fragment>
            <MetaData title={'Dashboard'}/>
            <Fragment>
                {loading ? <Loader/> : (
                    <Fragment>
                        <MetaData title={'Admin Dashboard'}/>
                        <div id="wrapper" className={isToggled ? null : "toggled"}   >
                            <div id="sidebar-wrapper" >
                                <ul className="sidebar-nav">
                                    <li className="sidebar-brand">Agile Technodynamics</li>
                                    <li> <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                    <li> <Link to="/admin/me"><i className="fa fa-user"></i> My Profile</Link></li>
                                    <li> <Link to="/"><i className="fa fa-home"></i> Agile Homepage</Link></li>
                                    {user && user.role !== 'admin' ? (
                                            <Fragment>
                                                <hr/>
                                                <li> <Link to="/admin/users/admin"><i className="fa fa-users"></i> Admins</Link></li>
                                                <li> <Link to="/admin/users/superadmin"><i className="fa fa-user-circle"></i> Superadmins</Link></li>
                                                <li> <Link to="/register"><i className="fa fa-user-plus"></i> Register</Link></li>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <li> <Link to="/admin/products"><i className="fa fa-shopping-bag"></i> Products</Link></li>
                                                <hr/>
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
                                </ul>
                            </div>
                            <div className="page-content-wrapper">
                                <div className="container-fluid">
                                    <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}  >
                                        <i className="fa fa-bars"   ></i>
                                    </a>
                                    {user && user.role !== 'admin' ? (
                                        <Fragment>
                                            <div className="main-section" style={{paddingTop: '65px'}}>
                                                <h3><strong>Overview</strong></h3>
                                                <div className="dashbord">
                                                    <div className="icon-section">
                                                        <i className="fa fa-users" aria-hidden="true"></i><br/>
                                                        <small>Admins</small>
                                                        <p>{adminCount} admins</p>
                                                    </div>
                                                    <div className="detail-section">
                                                        <Link to="/admin/users/admin">More Info </Link>
                                                    </div>
                                                </div>
                                                <div className="dashbord dashbord-green">
                                                    <div className="icon-section">
                                                        <i className="fa fa-user-circle" aria-hidden="true"></i><br/>
                                                        <small>Super Admins</small>
                                                        <p>{superadminCount}  superadmins</p>
                                                    </div>
                                                    <div className="detail-section">
                                                        <Link to="/admin/users/superadmin">More Info </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <div className="main-section" style={{paddingTop: '65px'}}>
                                                <h3><strong>Inbox</strong></h3>
                                                <div className="dashbord">
                                                    <div className="icon-section">
                                                        <i className="fa fa-envelope" aria-hidden="true"></i><br/>
                                                        <small>Inquiries</small>
                                                        <p>{inquiryCount} messages</p>
                                                    </div>
                                                    <div className="detail-section">
                                                        <Link to="/admin/inquiries">View Inquiries</Link>
                                                    </div>
                                                </div>
                                                <div className="dashbord dashbord-green">
                                                    <div className="icon-section">
                                                        <i className="fa fa-archive" aria-hidden="true"></i><br/>
                                                        <small>Appointments</small>
                                                        <p>{appointmentCount} messages</p>
                                                    </div>
                                                    <div className="detail-section">
                                                        <Link to="/admin/appointments">View Appointments</Link>
                                                    </div>
                                                </div>
                                                <div className="dashbord dashbord-orange">
                                                    <div className="icon-section">
                                                        <i className="fa fa-inbox" aria-hidden="true"></i><br/>
                                                        <small>Other Concerns</small>
                                                        <p>{otherCount} messages</p>
                                                    </div>
                                                    <div className="detail-section">
                                                        <Link to="/admin/others">View Others</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                    <div className="main-section" style={{paddingTop: '65px'}}>
                                        <h3><strong>Settings</strong></h3>
                                        <div className="dashbord dashbord-blue">
                                            <div className="icon-section">
                                                <i className="fa fa-home" aria-hidden="true"></i><br/>
                                                <p>Update Home</p>
                                            </div>
                                            <div className="detail-section">
                                                <Link to="/admin/home">Update <i className="fa fa-angle-right"></i></Link>
                                            </div>
                                        </div>
                                        <div className="dashbord dashbord-red">
                                            <div className="icon-section">
                                                <i className="fa fa-info-circle" aria-hidden="true"></i><br/>
                                                <p>Update About</p>
                                            </div>
                                            <div className="detail-section">
                                                <Link to="/admin/about">Update <i className="fa fa-angle-right"></i></Link>
                                            </div>
                                        </div>
                                        <div className="dashbord dashbord-skyblue">
                                            <div className="icon-section">
                                                <i className="fa fa-quote-left" aria-hidden="true"></i><br/>
                                                <p>Update Footer</p>
                                            </div>
                                            <div className="detail-section">
                                                <Link to="/admin/footer">Update <i className="fa fa-angle-right"></i></Link>
                                            </div>
                                        </div>
                                        <div className="dashbord dashbord-green">
                                            <div className="icon-section">
                                                <i className="fa fa-check" aria-hidden="true"></i><br/>
                                                <p>Update Services</p>
                                            </div>
                                            <div className="detail-section">
                                                <Link to="/admin/service">More Info </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </Fragment>
    )
}

export default Dashboard
