import React, { Fragment, useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { logout } from '../../actions/userActions'
import { DELETE_USER_RESET, UPDATE_USER_RESET } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const ListAdmins = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, users } = useSelector(state => state.users)
    const { user } = useSelector(state => state.auth)
    const { deleteError, isUpdated, isDeleted } = useSelector(state => state.updateUser)

    const [isToggled, setToggled] = useState('false')
    const [id, setId] = useState('')
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleToggle = () => setToggled(!isToggled)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
        handleClose()
    }

    useEffect(() => {
        dispatch(getUsers())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isUpdated){
            alert.success('User has been updated.')
            history.push('/admin/users/admin')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

        if(isDeleted){
            alert.success('User has been deleted.')
            history.push('/admin/users/admin')

            dispatch({
                type: DELETE_USER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, isDeleted, isUpdated, deleteError, history])

    const setAdminData = () => {
        const data = { 
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    width: 250
                },
                {
                    label: 'Contact Number',
                    field: 'contactNumber',
                    width: 190
                },
                {
                    label: 'Email',
                    field: 'email',
                    width: 350
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150
                }
            ],
            rows: []
         }

         users.forEach(user => {
            if(user.role === 'admin'){
                data.rows.push({
                    name: user.name,
                    contactNumber: user.contactNumber,
                    email: user.email,
                    actions:
                    <Fragment>
                        <div style={{display: 'flex'}}>
                            <Link to={`/superadmin/user/${user._id}`} className='btn btn-primary py-1 px-2 ml-2'>
                                <i className='fa fa-pencil'></i>
                            </Link>
                            <button className="btn btn-danger py-1 px-2 ml-2"
                                onClick={() => {
                                    setId(user._id)
                                    handleShow()
                                }}
                            >
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
            <MetaData title={'Admins'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}>
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
                                    <li> <Link to="/admin/appointments"><i className="fa fa-archive"></i> Appointments</Link></li>
                                    <li> <Link to="/admin/others"><i className="fa fa-inbox"></i> Other Concerns</Link></li>
                                    <hr/>
                                    <li> <Link to="/admin/archives"><i className="fa fa-envelope-open"></i> Archives</Link></li>
                                    <li> <Link to="/admin/trash"><i className="fa fa-trash"></i> Trash</Link></li>
                                </Fragment>
                            )
                        }
                        <hr/>
                        <li> <Link to="/admin/help"><i className="fa fa-question-circle"></i> Help</Link></li>
                        <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                    </ul>
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                            <i className="fa fa-bars"   ></i>
                        </a>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete user account?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this user? This cannot be undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                Close
                                </Button>
                                <Button variant="primary" onClick={() => deleteUserHandler(id)}>
                                Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Fragment>
                        <div style={{padding: '30px 15px'}}>
                            <h1 className='mt-3 mb-3 ml-10 mr-10'>Admins</h1>
                            {loading? <Loader/> : (
                                <MDBDataTableV5
                                    data={setAdminData()}
                                    entries={5}
                                    entriesOptions={[5, 10, 15, 20]}
                                    searchTop
                                    searchBottom={false}
                                    scrollX
                                    sortable={true}
                                    hover
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

export default ListAdmins
