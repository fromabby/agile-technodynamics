import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateInquiry, listInquiry, clearErrors } from '../../actions/inquiryActions'
import { UPDATE_INQUIRY_RESET } from '../../constants/inquiryConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from '../../actions/userActions'

const ListOrders = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, inquiries } = useSelector(state => state.listInquiry)
    const { isUpdated } = useSelector(state => state.inquiry)
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
        dispatch(listInquiry());

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success('Message has been moved to trash successfully.');
            history.push('/admin/appointments')

            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, history, isUpdated])

    const updateInquiryHandler = (id, inquiryStatus) => { 
        if(window.confirm("Are you sure you want to delete this? This message will be moved to Trash.")){
            const formData = new FormData();
            formData.set('inquiryStatus', inquiryStatus);
    
            dispatch(updateInquiry(id, formData));
        }
    }

    let len = 0;
    
    const setInquiries = () => {
        const data = { 
            columns: [
                {
                    label: 'Date / Time',
                    field: 'createdAt',
                    sort: 'desc'
                },
                {
                    label: 'Last Name',
                    field: 'lastName'
                },
                {
                    label: 'First Name',
                    field: 'firstName'
                },
                {
                    label: 'Company Name',
                    field: 'companyName'
                },
                
                {
                    label: 'Status',
                    field: 'inquiryStatus'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
         }

         inquiries.forEach(inquiry => {
             if(inquiry.concernType==='Appointment' && (inquiry.inquiryStatus !== "Deleted" && inquiry.inquiryStatus !== "Resolved")){
                len += 1
                data.rows.push({
                    createdAt: inquiry.createdAt,
                    firstName: inquiry.firstName,
                    lastName: inquiry.lastName,
                    companyName: inquiry.companyName,
                    inquiryStatus: inquiry.inquiryStatus && (String(inquiry.inquiryStatus).includes('Processing') || String(inquiry.inquiryStatus).includes('Resolved'))
                        ? <p style={{ color: 'green' }}>{inquiry.inquiryStatus}</p>
                        :  <p style={{ color: 'red' }}>{inquiry.inquiryStatus}</p>,
                    actions:
                    <Fragment>
                        <div style={{display: 'flex'}}>
                            <Link to={`/admin/inquiry/${inquiry._id}`} className='btn btn-primary py-1 px-2 ml-2'>
                                <i className='fa fa-eye'></i>
                            </Link>
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => updateInquiryHandler(inquiry._id, "Deleted")}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>     
                    </Fragment>
                 })
             }
         })

         return data
    }

    return (
        <Fragment>
            <MetaData title={'Appointments'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}   >
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
                        <div style={{padding: '30px'}}>
                            <h1 className='mt-3 mb-3 ml-10 mr-10'>Inbox - Appointments</h1>
                            {loading? <Loader/> : (
                                <MDBDataTableV5
                                    data={setInquiries()}
                                    entries={5}
                                    entriesOptions={[5, 10, 15, 20]}
                                    searchTop
                                    scrollX
                                />
                            )}
                        </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ListOrders