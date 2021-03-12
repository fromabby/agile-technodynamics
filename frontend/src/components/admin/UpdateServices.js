import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { updateServices, getServiceDetails, clearErrors } from '../../actions/websiteActions'
import { UPDATE_SERVICES_RESET } from '../../constants/websiteConstants'

import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { Modal, Button } from 'react-bootstrap'

const UpdateServices = ({ match, history }) => {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [iconBackground, setIconBackground] = useState('');
    const [icon, setIcon] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, service } = useSelector(state => state.serviceDetails);
    const { error: updateError, isUpdated, loading } = useSelector(state => state.website);
    const { user } = useSelector(state => state.auth)
    
    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const serviceId = match.params.id

    useEffect(() => {
        if(service && service._id !== serviceId) {
            dispatch(getServiceDetails(serviceId))
        }
        else {
            setTitle(service.title);
            setSubtitle(service.subtitle);
            setDescription(service.description);
            setIconBackground(service.iconBackground);
            setIcon(service.icon);
        }

        if(error){
            history.push('/admin/service')
            alert.error(error);
            dispatch(clearErrors());
        }
        
        if(updateError){
            history.push('/admin/service')
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success('Service updated successfully');

            history.push('/admin/service')

            dispatch({
                type: UPDATE_SERVICES_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, service, serviceId, isUpdated, updateError])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', title);
        formData.set('subtitle', subtitle);
        formData.set('description', description);
        formData.set('iconBackground', iconBackground);
        formData.set('icon', icon);

        dispatch(updateServices(service._id, formData));
    }

    const discardChanges = () => {
        handleClose()
        history.push('/admin/service')
    }
    
    return (
        <Fragment>
            <MetaData title={'Update Services'}/>
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
                                    <li> <Link to="/admin/appointments"><i className="fa fa-archive"></i> Appointments</Link></li>
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
                    <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} >
                        <i className="fa fa-bars"   ></i>
                    </a>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Discard Changes?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to discard your changes?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={discardChanges}>
                                Yes, I'm sure
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="container-fluid">
                        <div className="login-clean">
                            <form method="put" onSubmit={submitHandler} encType='multipart/form-data'    >
                                <h2 className="sr-only">Update Services</h2>
                                <div className="div-forgot-password">
                                    <h3 className="forgot-password-heading">Update Services </h3>
                                </div>
                                <div className="form-group">
                                    <h6>Title</h6>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="title" 
                                        name="title" 
                                        placeholder="Title"
                                        value={title}
                                        disabled={true}
                                        style={{backgroundColor: '#F5F5F5', color: 'gray'}}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Subtitle</h6>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="subtitle" 
                                        name="subtitle" 
                                        value={subtitle}
                                        disabled={true}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Description</h6>
                                    <textarea
                                        type="text" 
                                        className="form-control" 
                                        name="description"
                                        value={description}
                                        placeholder="Services Description"
                                        style={{width: '100%', height: '150px'}}
                                        onChange={(e) => setDescription(e.target.value)}
                                        height='55px'
                                    />
                                </div>
                                <div className="form-group">
                                    <h6>Icon Background (eg. primary, secondary)</h6>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon2">
                                                text-
                                            </span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="iconBackground" 
                                            name="iconBackground" 
                                            value={iconBackground}
                                            onChange={(e) => setIconBackground(e.target.value)}
                                            aria-label="iconBackground"
                                            aria-describedby="basic-addon2"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h6>Icon (eg. eye, check, info)</h6>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                fa-
                                            </span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="icon" 
                                            name="icon" 
                                            value={icon}
                                            onChange={(e) => setIcon(e.target.value)}
                                            aria-label="icon"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <h6 style={{textAlign: 'left'}}>Icon Preview</h6>
                                    <span className="fa-stack fa-4x">
                                        <i className={`fa fa-circle fa-stack-2x text-${iconBackground}`}></i>
                                        <i className={`fa fa-${icon} fa-stack-1x fa-inverse`}></i>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <button 
                                        className="btn btn-primary btn-block" 
                                        type="submit"
                                    >
                                        Update Services
                                    </button>
                                </div>
                                <div className="form-group">
                                    <a
                                        className="btn btn-secondary btn-block mt-2"
                                        onClick={handleShow}
                                        style={{color: 'white'}}
                                    >Discard</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateServices
