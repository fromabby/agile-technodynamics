import React, { Fragment, useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import '../../css/dashboard.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET, UPDATE_USER_RESET } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from '../../actions/userActions'

const ListUsers = ({history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.users)
    const { user } = useSelector(state => state.auth)
    const { isUpdated } = useSelector(state => state.updateUser)

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }

    useEffect(() => {
        dispatch(getUsers());

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if(isUpdated){
            alert.success('User has been updated successfully.');
            history.push('/admin/users/superadmin')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, isUpdated, history])

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    let len = 0;

    const setSuperAdminData = () => {
        const data = { 
            columns: [
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Contact Number',
                    field: 'contactNumber',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
         }

         users.forEach(superadmin => {
            if(superadmin.role === 'superadmin') {
                len += 1
                data.rows.push({
                    role: superadmin.role,
                    name: superadmin.name,
                    contactNumber: superadmin.contactNumber,
                    email: superadmin.email,
                    actions:   
                    <Fragment>
                        <button
                            className='btn btn-primary py-1 px-2 ml-2'
                            disabled={(user.email === superadmin.email) ? false : true}
                            onClick={
                                () => updateUser(superadmin._id)
                            }
                        >
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className="btn btn-danger py-1 px-2 ml-2"
                                disabled={true}
                        >
                            <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>
                })
            }
         })

         return data
    }

    const updateUser = (id) => {
        history.replace(`/superadmin/user/${id}`)
    }

    return (
        <Fragment>
            <MetaData title={'Superadmins'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"} style={{paddingTop: '11px'}}>
            <div id="sidebar-wrapper" style={{"background": "var(--gray-dark)", "color": "var(--white)"}}>
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
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} style={{position: 'fixed'}}>
                            <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                        </a>
                        <Fragment>
                        <div style={{padding: '30px'}}>
                            <h1 className='mt-3 mb-3 ml-10 mr-10'>Superadmins</h1>
                            {loading? <Loader/> : (
                                <MDBDataTable
                                    data={setSuperAdminData()}
                                    className='px-3'
                                    bordered
                                    striped
                                    hover
                                    entries={5}
                                    entriesOptions={[5, 10, 15, 20]}
                                    paging={len < 5 ? false : true}
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

export default ListUsers
