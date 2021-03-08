import React, { Fragment, useState } from 'react'
import '../../css/Navbar---Apple.css'
import '../../css/Navbar---Apple-1.css'
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

    const [isOpen, setOpen] = useState('false');

    const toggle = () => {
        setOpen(!isOpen)
    }

    const [isProductOpen, setProductOpen] = useState('false');

    const productToggle = () => {
        setProductOpen(!isProductOpen)
    }

    const [isUserOpen, setUserOpen] = useState('false');

    const userToggle = () => {
        setUserOpen(!isUserOpen)
    }

    return (
        <Fragment>
            <nav className="navbar navbar-light navbar-expand-md fixed-top bg-light navbar--apple">
                <div className="container">
                    <button data-toggle="collapse" data-target="#menu" className="navbar-toggler" onClick={toggle}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon"><i className="la la-navicon"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav flex-grow-1 justify-content-between">
                            <li className="nav-item d-none d-xs-block d-md-block">
                                <a href="/">
                                    <img className="nav-link nav-logo" src="https://res.cloudinary.com/agiletech3itf/image/upload/v1615182866/agile-header-logo.png"/>
                                </a>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/"><strong></strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/"><strong>Home</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about-us"><strong>About Us</strong></Link></li>
                        <div className="dropdown d-inline">    
                            <button
                                className="btn dropdown-toggle text-black nav-link"
                                type="button"
                                id="productMenuButton"
                                data-toggle="dropdown"
                                aria-aria-haspopup="true"
                                aria-expanded="false"
                                style={{fontSize: '15px'}}
                                onClick={productToggle}
                            >
                                <strong>Products</strong>
                            </button>
                            <div className="dropdown-menu" aria-aria-labelledby="productMenuButton">
                                <Link className="dropdown-item" to='/our-products'>
                                    All Products
                                </Link>
                                <hr/>
                                <Link className="dropdown-item" to='/products/Mechanical Engineering'>
                                    Mechanical Engineering
                                </Link>
                                <Link className="dropdown-item" to='/products/DC Power Systems'>
                                    DC Power Systems
                                </Link>
                                <Link className="dropdown-item" to='/products/Electrical Engineering Equipment'>
                                    Electrical Engineering Equipment
                                </Link>
                                <Link className="dropdown-item" to='/products/Test Equipment'>
                                    Test Equipment
                                </Link>
                                <Link className="dropdown-item" to='/products/Others'>
                                    Others
                                </Link>
                            </div>
                        </div>
                        <li className="nav-item"><Link className="nav-link" to="/our-services"><strong>Services</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact-us"><strong>Contact Us</strong></Link></li>
                        {user ? (
                            <div class="dropdown d-inline">
                                <button
                                    className="btn dropdown-toggle text-black nav-link"
                                    type="button"
                                    id="userMenuButton"
                                    data-toggle="dropdown"
                                    aria-aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{fontSize: '15px'}}
                                    onClick={userToggle}
                                >
                                    <img 
                                        class='mr-2 rounded-circle'
                                        src={userAvatar}
                                        width='30' 
                                        height='32'
                                    />{user && user.name}
                                </button>
                                <div class="dropdown-menu" aria-aria-labelledby="userMenuButton">
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