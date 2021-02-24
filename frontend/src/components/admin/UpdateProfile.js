import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { updateProfile, loadUser, clearErrors } from './../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { logout } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'

const UpdateProfile = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('images/default_avatar.png');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);
    
    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setContactNumber(user.contactNumber);
            setAddress(user.address);
            setAvatarPreview(user.avatar.url);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }

        if(isUpdated){
            alert.success('User updated successfully');
            dispatch(loadUser());

            history.push('/admin/me')

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, user, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('contactNumber', contactNumber);
        formData.set('address', address);
        formData.set('avatar', avatar);

        dispatch(updateProfile(formData));
    }

    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <Fragment>
            <MetaData title={'Update Profile'}/>
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
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                            <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                        </a>
                        <div className="container">
                            <div className="main-body">
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src={avatarPreview} alt="Admin" className="rounded-circle" width="100%" style={{minWidth: '100px', maxWidth: '150px'}}/>
                                                    <div className="mt-3">
                                                    <hr/>
                                                    <input 
                                                        type="file" 
                                                        id="avatar" 
                                                        name="avatar" 
                                                        accept="images/*"
                                                        onChange={onChange}
                                                        style={{width: '90%'}}
                                                    />
                                                    <br/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <form method="post" onSubmit={submitHandler}>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                        <h6 className="mb-0">Full Name</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                        <h6 className="mb-0">Email</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="email" 
                                                            className="form-control" 
                                                            name="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                        <h6 className="mb-0">Phone</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            name="contactNumber"
                                                            value={contactNumber}
                                                            onChange={(e) => setContactNumber(e.target.value)}
                                                        />
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                        <h6 className="mb-0">Address</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <textarea 
                                                                type="text"
                                                                className="form-control"
                                                                name="address"
                                                                value={address}
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                style={{height: '150px'}}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <br/>
                                                        <br/>
                                                        <button
                                                            className="btn btn-primary btn-block"
                                                            type="submit"
                                                            disabled={ loading ? true : false}
                                                        >Update Profile</button>
                                                    </div>
                                                </form>
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
    )
}

export default UpdateProfile
