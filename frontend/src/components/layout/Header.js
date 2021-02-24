import React from 'react'
import { Fragment } from 'react'
import '../../css/styles.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from './../../actions/userActions'

const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }
    
    let userAvatar = ""

    if(user && user.avatar) {
        userAvatar = user.avatar.url
    } else {
        userAvatar = ""
    }

    return (
        <Fragment>
        <nav className="navbar navbar-dark navbar-expand-md fixed-top">
            <div className="container">
                <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a href="/">
                    <img className="agile-logo" src="https://res.cloudinary.com/agiletech3itf/image/upload/v1610472388/agile-tech-big-blue-logo_cej4nt.png"/>
                </a>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="nav navbar-nav flex-grow-1 justify-content-between">
                        <li className="nav-item"><Link className="nav-link" to="#"></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/"><strong>Home</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about-company"><strong>About Us</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/our-products"><strong>Products</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/our-services"><strong>Services</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact-us"><strong>Contact Us</strong></Link></li>
                        {user ? (
                                <div className="dropdown d-inline">
                                    
                                    <Link
                                    className="btn dropdown-toggle text-black mr-4"
                                    type="button"
                                    id="dropDownMenuButton"
                                    data-toggle="dropdown"
                                    aria-aria-haspopup="true"
                                    aria-expanded="false">
                                    
                                    <img 
                                        className='mr-2 rounded-circle'
                                        src={userAvatar}
                                        width='30' 
                                        height='32'
                                    />
                                    {user && user.name}

                                    </Link>
                                    <div className="dropdown-menu" aria-aria-labelledby="dropDownMenuButton">
                                        <Link className="dropdown-item" to="/admin/dashboard">
                                            Dashboard
                                        </Link>
                                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                            Log out
                                        </Link>
                                    </div>
                                </div>
                                
                            ) : !loading && <Link to="/login">
                                <div></div>
                            </Link>}
                    </ul> 
                </div>
            </div>
        </nav>
        </Fragment>
    )
}

export default Header;