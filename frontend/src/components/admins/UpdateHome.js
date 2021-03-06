import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import { updateHome, getHomeDetails, clearErrors } from '../../actions/websiteActions'
import { logout } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { UPDATE_HOME_RESET, UPDATE_HOME_REQUEST } from '../../constants/websiteConstants'
import imageCompression from 'browser-image-compression'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const UpdateHome = ({match, history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading: homeLoading, error, home } = useSelector(state => state.homeDetails)
    const { error: updateError, isUpdated, loading } = useSelector(state => state.website)
    const { user } = useSelector(state => state.auth)
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('images/default_avatar.png')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

    const homeId = match.params.id

    const handleToggle = () => setToggled(!isToggled)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('description', description)
        formData.set('image', image)

        dispatch(updateHome(home._id, formData))
    }

    const onChange = file => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setImagePreview(reader.result)
                setImage(reader.result)
            }
        }

        reader.readAsDataURL(file)
        dispatch({
            type: UPDATE_HOME_RESET
        })
    }

    const handleImageUpload = e => {

        var imageFile = e.target.files[0]

        if(!imageFile.type.match(/image.*/)){
            dispatch({
                type: UPDATE_HOME_REQUEST
            })

            setImagePreview(home.image.url)
            return alert.error('Please upload an image file')
        }
      
        var options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
      
                onChange(compressedFile)  
            })
            .catch(function (error) {
                console.log(error.message)
            })	

            dispatch({
                type: UPDATE_HOME_REQUEST
            })
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    useEffect(() => {
        if(home && home._id !== homeId) {
            dispatch(getHomeDetails(homeId))
        }
        else {
            setName(home.name)
            setDescription(home.description)
            setImagePreview(home.image.url)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_HOME_RESET
            })
        }
        
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_HOME_RESET
            })
        }

        if(isUpdated){
            alert.success('Home updated successfully')
            dispatch(getHomeDetails(homeId))
            history.push('/admin/home')

            dispatch({
                type: UPDATE_HOME_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, home, homeId, isUpdated, updateError])
    
    return (
        <Fragment>
            <MetaData title={'Update Home'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}>
                <div id="sidebar-wrapper">
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
                            <div style={{width: '100%', height: '40px', position: 'fixed', background: 'white'}}>
                                <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                                    <i className="fa fa-bars"></i>
                                </a>
                                <button className="btn btn-primary" onClick={handleShow} style={{marginLeft: '35px', marginTop: '5px', fontSize: '12px', background: 'transparent', color: '#0d163f', border: 'none', position: 'fixed', zIndex: '999'}}>
                                    <i className="fa fa-arrow-left fa-inverse" style={{color: '#0d163f'}}></i> Back
                                </button>
                            </div>
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
                            {homeLoading ? <Loader/> : (
                                <Fragment>
                                    <div className="login-clean">
                                        <form method="put" onSubmit={submitHandler} encType='multipart/form-data' >
                                            <h2 className="sr-only">Update Home</h2>
                                            <div className="div-forgot-password">
                                                <h3 className="forgot-password-heading">Update Home </h3>
                                            </div>
                                            <div className="form-group">
                                                <h6>Name</h6>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="name" 
                                                    name="name" 
                                                    value={name}
                                                    disabled={true}
                                                    style={{backgroundColor: '#F5F5F5', color: 'gray'}}
                                                    onChange={e => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Description</h6>
                                                <textarea 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="description" 
                                                    name="description" 
                                                    placeholder="Description"
                                                    value={description}
                                                    disabled={String(home.name).includes('Description') ? false : true}
                                                    style={String(home.name).includes('Description') ? {width: '100%', height: '150px', minHeight: '50px'} : {backgroundColor: '#F5F5F5', color: 'gray', width: '100%', height: '150px'}}
                                                    onChange={e => setDescription(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Image</h6>
                                                <figure>
                                                    <img 
                                                        src={imagePreview} 
                                                        className='mt-3 mr-2' 
                                                        width='110' 
                                                        height='104'
                                                    />
                                                </figure>
                                                {String(home.name).includes('Description') ? (
                                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Image upload disabled</Tooltip>}>
                                                        <span className="d-inline-block">
                                                            <input 
                                                                type="file" 
                                                                id="image" 
                                                                name="image" 
                                                                accept="images/*"
                                                                disabled={true} 
                                                                style={{ pointerEvents: 'none' }}
                                                            />
                                                        </span>
                                                    </OverlayTrigger>
                                                ) : (
                                                    <input 
                                                        type="file" 
                                                        id="image" 
                                                        name="image" 
                                                        accept="images/*"
                                                        onChange={handleImageUpload}
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <button 
                                                    className="btn btn-primary btn-block" 
                                                    type="submit"
                                                    disabled={loading ? true : false}
                                                    style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                                >
                                                    Update Home
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
                                </Fragment>
                            )}
                        </div>
                    </div>
            </div>
        </Fragment>
    )
}

export default UpdateHome
