import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { register, clearErrors } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'
import { Link } from 'react-router-dom'

const Register = ( { history } ) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, contactNumber, address, password, confirmPassword, } = user;
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('images/default_avatar.png');
    const [useDefaultImage, setUseDefaultImage] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isCreated, error, loading, success } = useSelector(state => state.register);

    const [isChecked, setChecked] = useState('false')

    const checkboxCheck = () => {
        setChecked(!isChecked)
    }

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => {
        setToggled(!isToggled)
    }
    
    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            history.push('/register-success')
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, isCreated, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        formData.set('contactNumber', contactNumber);
        formData.set('address', address);
        formData.set('avatar', avatar);
        formData.set('useDefaultImage', useDefaultImage)

        dispatch(register(formData));
    }

    const onChange = e => {
        
        if(e.target.name === 'useDefaultImage') {
            let chkbox = document.getElementById('useDefaultImage')

            if(chkbox.checked == true) { //if changed to ===, register would not work
                setUseDefaultImage("True")
            }
            else{
                setUseDefaultImage("False")
            }

        } else {
            if(e.target.name === 'avatar') {

                const reader = new FileReader();
    
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setAvatarPreview(reader.result)
                        setAvatar(reader.result)
                    }
                }
    
                reader.readAsDataURL(e.target.files[0])
    
            }
            else {
                setUser({
                    ...user,
                    [e.target.name]: e.target.value
                })
            }
        }
    }

    return (
        <Fragment>
            <MetaData title={'Register'}/>
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
                        <div className="container">
                            <div className="main-body">
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">   
                                                <div className="row text-center">
                                                    <h3 className="ml-3 mb-5 ">Register New User</h3>
                                                </div>
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src={avatarPreview} alt="Admin" className="rounded-circle" width="150"/>
                                                    <div className="mt-3">
                                                        <hr/>
                                                        <input 
                                                            type='checkbox'
                                                            id='useDefaultImage'
                                                            name='useDefaultImage'
                                                            value={useDefaultImage}
                                                            onChange={onChange}
                                                            onClick={checkboxCheck}/>
                                                            &nbsp;Use default image
                                                            <br/>
                                                            <br/>
                                                            <input 
                                                                type="file" 
                                                                id="avatar" 
                                                                name="avatar" 
                                                                accept="images/*"
                                                                onChange={onChange}
                                                                style={{width: '90%'}}
                                                                disabled={isChecked ? false : true}
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
                                                                onChange={onChange}
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
                                                                onChange={onChange}
                                                            />
                                                            </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Contact Number</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input 
                                                                type="tel" 
                                                                className="form-control" 
                                                                name="contactNumber" 
                                                                value={contactNumber}
                                                                pattern="^\d{4}-\d{3}-\d{4}$"
                                                                onChange={onChange}
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
                                                                onChange={onChange}
                                                                style={{height: '150px'}}
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Password</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input 
                                                                type="password" 
                                                                className="form-control" 
                                                                name="password"
                                                                value={password}
                                                                onChange={onChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Confirm Password</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input 
                                                                type="password" 
                                                                className="form-control" 
                                                                name="confirmPassword"
                                                                value={confirmPassword}
                                                                onChange={onChange}
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
                                                        >Register</button>
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

export default Register
