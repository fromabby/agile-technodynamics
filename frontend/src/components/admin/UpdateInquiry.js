import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateInquiry, getInquiryDetails, clearErrors } from '../../actions/inquiryActions'
import { UPDATE_INQUIRY_RESET } from '../../constants/inquiryConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'

const UpdateInquiry = ( { match, history } ) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, inquiry } = useSelector(state => state.inquiryDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.inquiry);
    const { user } = useSelector(state => state.auth)

    const inquiryId = match.params.id

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => { 
        if(inquiry && inquiry._id !== inquiryId) {
            dispatch(getInquiryDetails(inquiryId))
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
            history.push('/admin/dashboard');
            alert.success('Inquiry updated successfully.')

            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, inquiry, inquiryId, history])

    const updateInquiryHandler = (id, inquiryStatus) => { 
        const formData = new FormData();
        formData.set('inquiryStatus', inquiryStatus);

        dispatch(updateInquiry(id, formData));
    }

    return (
        <Fragment>
            <MetaData title={'View Message'}/>
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
                    <Fragment>
                        {loading ? <Loader/> : (
                            <section className="process-section" style={{backgroundColor: '#f1f7fc', fontSize: '100%', fontWeight: '400', lineHeight: '1.4', color: '#000'}}>
                                <table style={{maxWidth: '670px', margin: '0 auto 20px auto', backgroundColor: '#fff', padding: '30px', WebkitBorderRadius: '3px', MozBorderRadius: '3px', borderRadius: '3px', WebkitBoxShadow: '0 1px 3px rgba(0,0,0.12), 0 1px 2px rgba(0,0,0,.24)', MozBoxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)', boxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)', borderTop: 'solid 10px #1b1449'}}>
                                    <thead>
                                        <tr>
                                        <th style={{textAlign: 'left'}}><img style={{maxWidth: '300px'}} src="https://res.cloudinary.com/agiletech3itf/image/upload/v1610472388/agile-tech-big-blue-logo_cej4nt.png" alt="logo"/></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td style={{height: '35px'}}></td>
                                        </tr>
                                        <tr>
                                        <td colspan="2" style={{border: 'solid 1px #ddd', padding:'10px 20px'}}>
                                            <p style={{fontSize:'14px', margin:'0 0 6px 0'}}><span style={{fontWeight: 'bold', display: 'inline-block', minWidth: '150px'}}>Concern Type</span><b style={{color: 'green', fontWeight: 'normal', margin: '0'}}>{inquiry.concernType}</b></p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td style={{height: '35px'}}></td>
                                        </tr>
                                        <tr>
                                        <td style={{width: '100%', padding: '20px', verticalAlign: 'top'}}>
                                            <h2 style={{margin: '0 0 10px 0', padding: '0'}}>Sender Details</h2>
                                            <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Name</span> {inquiry.firstName} {inquiry.lastName}</p>
                                            <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Company and Position</span> {inquiry.companyName}, {inquiry.position}</p>
                                            <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Email</span> {inquiry.customerEmail}</p>
                                            <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Phone</span> {inquiry.contactNumber}</p>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td colspan="2" style={{padding: '30px 15px 0 15px'}}>
                                            <h2 style={{margin: '0 0 10px 0', padding: '0'}}>Message Content</h2>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td colspan="2" style={{padding:'15px'}}>
                                            <p style={{fontSize: '14px', margin: '0', padding: '10px', textAlign: 'justify'}}>
                                            {inquiry.customerMessage}
                                            </p>
                                        </td>
                                        </tr>
                                        <tr style={{ width: '100%'}}>
                                            {(inquiry.inquiryStatus === 'Resolved') ? (
                                                <Fragment>
                                                    <button 
                                                        className="btn btn-primary update-status-button" 
                                                        type="button"
                                                        onClick={() => updateInquiryHandler(inquiry._id, 'Unresolved')}
                                                        style={{margin: '50px auto 50px auto', display: 'block'}}>
                                                        Mark this message as 'Resolved'
                                                        Restore message back to {inquiry.concernType}
                                                    </button>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <button 
                                                        className="btn btn-primary update-status-button align-center" 
                                                        type="button"
                                                        onClick={() => updateInquiryHandler(inquiry._id, 'Resolved')}
                                                        style={{margin: '50px auto 50px auto', display: 'block'}}>
                                                        Mark this message as 'Resolved'
                                                    </button>
                                                </Fragment>
                                            )}
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        )}
                    </Fragment>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateInquiry
