import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from './../../actions/userActions'
import '../../css/Navbar---Apple.css'
import '../../css/Navbar---Apple-1.css'
import '../../css/bootstrap.min.css'

const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)

    const [isOpen, setOpen] = useState(false)
    const [isUserOpen, setUserOpen] = useState('false')

    const toggle = () => setOpen(!isOpen)
    const userToggle = () => setUserOpen(!isUserOpen)

    const logoutHandler = () => {
        dispatch(logout())
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
            <nav className="navbar navbar-light navbar-expand-md fixed-top bg-light navbar--apple">
                <div className="container">
                    <button 
                        data-toggle="collapse" 
                        data-target="#menu" 
                        className="navbar-toggler"
                        aria-expanded="true"
                        onClick={() => toggle()}
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon"><i className="la la-navicon"></i></span>
                    </button>
                    <div className={isOpen ? "collapse navbar-collapse" : "collapse navbar-collapse d-none"} id="menu">
                        <ul className="navbar-nav flex-grow-1 justify-content-between">
                            <li className="nav-item d-none d-xs-block d-md-block">
                                <a href="/">
                                    <img className="nav-link nav-logo" alt="Agile Technodynamics, Inc." src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-header-logo_tan5lw.png"/>
                                </a>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/"><strong></strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/"><strong>Home</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about-us"><strong>About Us</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/products"><strong>Products</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/our-services"><strong>Services</strong></Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact-us"><strong>Contact Us</strong></Link></li>
                        {user ? (
                            <div class="dropdown d-inline">
                                <button
                                    className="btn dropdown-toggle text-black nav-link"
                                    type="button"
                                    id="userMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{fontSize: '15px'}}
                                    onClick={userToggle}
                                >
                                    <img 
                                        class='mr-2 rounded-circle'
                                        src={userAvatar}
                                        alt="Avatar"
                                        width='30' 
                                        height='32'
                                    />{user && user.name}
                                </button>
                                <div class="dropdown-menu" aria-label="userMenuButton">
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

export default Header