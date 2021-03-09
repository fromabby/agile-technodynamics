import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateInquiry, deleteInquiry, getInquiryDetails, clearErrors } from '../../actions/inquiryActions'
import { UPDATE_INQUIRY_RESET } from '../../constants/inquiryConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'
import { inquiryReducer } from '../../reducers/inquiryReducers'

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
            history.push('/admin/dashboard')
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            history.push('/admin/dashboard')
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated) {
            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, inquiry, inquiryId, history])

    const updateInquiryHandler = (id, inquiryStatus, concernType, inTrash) => { 
        const formData = new FormData();
        formData.set('inquiryStatus', inquiryStatus);

        if(inquiryStatus === 'Unresolved') {
            dispatch(updateInquiry(id, formData));
            history.push('/admin/archives')
        } else {
            dispatch(updateInquiry(id, formData));
            if(inquiryStatus === 'Resolved' && inTrash) {
                history.push('/admin/trash')
            } else {
                if(concernType === 'Inquiry'){
                    history.push('/admin/inquiries')
                } else if(concernType === 'Appointment'){
                    history.push('/admin/appointments')
                } else {
                    history.push('/admin/others')
                }
            }
        }
    }

    const deleteInquiryHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this message? This cannot be undone.")){
            dispatch(deleteInquiry(id))
            history.push('/admin/trash')

            alert.success('Message deleted successfully.')
        }
    }

    return (
        <Fragment>
            <MetaData title={'View Message'}/>
            <div id="wrapper" className={isToggled ? null : "toggled"}>
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
                            )
                        }
                        <hr/>
                        <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                    </ul>
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                    <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}  >
                        <i className="fa fa-bars"   ></i>
                    </a>
                    <Fragment>
                        {loading ? <Loader/> : (
                            <section className="process-section" style={{fontSize: '100%', fontWeight: '400', lineHeight: '1.3', color: '#000', width: '100%', paddingTop: '11px'}}>
                                <table style={{width: '85%', minWidth: '150px', margin: '20px auto', backgroundColor: '#fff', padding: '30px', WebkitBorderRadius: '3px', MozBorderRadius: '3px', borderRadius: '3px', WebkitBoxShadow: '0 1px 3px rgba(0,0,0.12), 0 1px 2px rgba(0,0,0,.24)', MozBoxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)', boxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)', borderTop: 'solid 10px #1b1449'}}>
                                    <tbody>
                                        <tr>
                                            <td style={{height: '20px'}}></td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '100%', padding: '15px', verticalAlign: 'top'}}>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Concern Type</span> {inquiry.concernType}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Status</span> {inquiry.inquiryStatus}</p>
                                                <br/>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Name</span> {inquiry.firstName} {inquiry.lastName}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Company and Position</span> {inquiry.companyName}, {inquiry.position}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Email</span> {inquiry.customerEmail}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Phone</span> {inquiry.contactNumber}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{padding: '0 15px'}}>
                                                <h3 style={{margin: '0 0 10px 0', padding: '0'}}>Message Content</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{padding:'15px'}}>
                                                <p style={{fontSize: '15px', margin: '0', padding: '10px 40px', textAlign: 'justify'}}>
                                                {inquiry.customerMessage}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr style={{ width: '100%'}}>
                                            {(inquiry.inquiryStatus === 'Resolved' ) ? (
                                                <Fragment>
                                                    <div style={{margin: '20px auto', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                                                        <button 
                                                            className="btn btn-primary update-status-button align-center ml-2 mr-2" 
                                                            type="button"
                                                            onClick={() => updateInquiryHandler(inquiry._id, 'Unresolved', inquiry.concernType, false)}
                                                        >
                                                            Restore message back to {inquiry.concernType}
                                                        </button>
                                                        <button 
                                                            className="btn btn-secondary update-status-button align-center ml-2 mr-2" 
                                                            type="button"
                                                            onClick={() => updateInquiryHandler(inquiry._id, 'Deleted', inquiry.concernType, false)}>
                                                            Delete message
                                                        </button>
                                                    </div>
                                                </Fragment>
                                            ) : ((inquiry.inquiryStatus === 'Deleted') ? (
                                                <Fragment>
                                                    <div style={{margin: '20px auto', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                                                        <button 
                                                            className="btn btn-primary update-status-button align-center ml-2 mr-2" 
                                                            type="button"
                                                            onClick={() => updateInquiryHandler(inquiry._id, 'Resolved', inquiry.concernType, true)}
                                                        >
                                                            Restore message back to Archives
                                                        </button>
                                                        <button 
                                                            className="btn btn-secondary update-status-button align-center ml-2 mr-2" 
                                                            type="button"
                                                            onClick={() => deleteInquiryHandler(inquiry._id)}>
                                                            Delete message permanently
                                                        </button>
                                                    </div>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <div style={{margin: '20px auto', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                                                        <button 
                                                            className="btn btn-primary update-status-button align-center ml-2 mr-2" 
                                                            type="button"
                                                            onClick={() => updateInquiryHandler(inquiry._id, 'Resolved', inquiry.concernType, false)}
                                                        >
                                                            Resolve message
                                                        </button>
                                                        <button 
                                                            className="btn btn-secondary update-status-button align-center ml-2 mr-2" 
                                                            type="button"
                                                            onClick={() => updateInquiryHandler(inquiry._id, 'Deleted', inquiry.concernType, false)}>
                                                            Delete message
                                                        </button>
                                                    </div>
                                                </Fragment>
                                                )
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
