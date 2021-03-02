import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { updateHome, getHomeDetails, clearErrors } from '../../actions/websiteActions'
import { UPDATE_HOME_RESET } from '../../constants/websiteConstants'

import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'

const UpdateHome = ({ match, history }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('images/default_avatar.png');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, home } = useSelector(state => state.homeDetails);
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

    const homeId = match.params.id

    useEffect(() => {
        if(home && home._id !== homeId) {
            dispatch(getHomeDetails(homeId))
        }
        else {
            setName(home.name);
            setDescription(home.description);
            setImagePreview(home.image.url);
        }

        if(error){
            history.push('/admin/home')
            alert.error(error);
            dispatch(clearErrors());

        }
        
        if(updateError){
            history.push('/admin/home')
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success('Home updated successfully');

            history.push('/admin/home')

            dispatch({
                type: UPDATE_HOME_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, home, homeId, isUpdated, updateError])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        formData.set('image', image);

        dispatch(updateHome(home._id, formData));
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setImagePreview(reader.result)
                setImage(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <Fragment>
            <MetaData title={'Update Home'}/>
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
                        <div className="login-clean">
                            <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} style={{marginTop: '-65px', position: 'fixed'}}>
                                <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                            </a>
                            <form method="put" onSubmit={submitHandler} encType='multipart/form-data'  style={{maxWidth: '500px'}}>
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
                                        onChange={(e) => setName(e.target.value)}
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
                                        style={String(home.name).includes('Description') ? {width: '100%', height: '150px'} : {backgroundColor: '#F5F5F5', color: 'gray', width: '100%', height: '150px'}}
                                        onChange={(e) => setDescription(e.target.value)}
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
                                    <input 
                                        type="file" 
                                        id="image" 
                                        name="image" 
                                        accept="images/*"
                                        disabled={String(home.name).includes('Description') ? true : false} 
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <button 
                                        className="btn btn-primary btn-block" 
                                        type="submit"
                                    >
                                        Update Home
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateHome
