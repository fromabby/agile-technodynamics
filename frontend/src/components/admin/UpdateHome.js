import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateHome, getHomeDetails, clearErrors } from '../../actions/websiteActions'
import { UPDATE_HOME_RESET } from '../../constants/websiteConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'

const UpdateHome = ({history}) => {
    
    const [productDescription, setProductDescription] = useState('')
    const [servicesDescription, setServicesDescription] = useState('')
    const [titleBackground, setTitleBackground] = useState('')
    const [servicesBackground, setServicesBackground] = useState('')
    const [productImageLeft, setProductImageLeft] = useState('')
    const [productImageRight, setProductImageRight] = useState('')
    
    //image previews
    const [titleBgPreview, setTitleBgPreview] = useState('')
    const [servicesBgPreview, setServicesBgPreview] = useState('')
    const [prodImgLeftPreview, setProdImgLeftPreview] = useState('')
    const [prodImgRightPreview, setProdImgRightPreview] = useState('')
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, homePage } = useSelector(state => state.homeDetails) 
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.website)

    const { user } = useSelector(state => state.auth)

    let var_titleBackground, var_servicesBackground, var_productImageLeft, var_productImageRight = ""

    if(homePage.titleBackground){
        var_titleBackground = homePage.titleBackground.url
    } 

    if(homePage.servicesBackground){
        var_servicesBackground = homePage.servicesBackground.url
    } 

    if(homePage.productImageLeft){
        var_productImageLeft = homePage.productImageLeft.url
    } 

    if(homePage.productImageRight){
        var_productImageRight = homePage.productImageRight.url
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

        dispatch(getHomeDetails())

        if(homePage){
            setProductDescription(homePage.productDescription)
            setServicesDescription(homePage.servicesDescription)
            setTitleBgPreview(var_titleBackground)
            setServicesBgPreview(var_servicesBackground)
            setProdImgLeftPreview(var_productImageLeft)
            setProdImgRightPreview(var_productImageRight)
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(updateError) {
            alert.error(updateError);

            history.push('/dashboard')
            dispatch(clearErrors())
        }

        if(isUpdated) {
            history.push('/admin/dashboard')
            alert.success('Home updated successfully.');

            dispatch({
                type: UPDATE_HOME_RESET
            })
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, updateError, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('productDescription', productDescription);
        formData.set('servicesDescription', servicesDescription);
        formData.set('titleBackground', titleBackground);
        formData.set('servicesBackground', servicesBackground);
        formData.set('productImageLeft', productImageLeft);
        formData.set('productImageRight', productImageRight);

        dispatch(updateHome(formData));
    }

    const changeTitleBg = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setTitleBgPreview(reader.result)
                setTitleBackground(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }
    
    const changeProdImgLeft = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setProdImgLeftPreview(reader.result)
                setProductImageLeft(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const changeProdImgRight = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setProdImgRightPreview(reader.result)
                setProductImageRight(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const changeServicesBg = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setServicesBgPreview(reader.result)
                setServicesBackground(reader.result)
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
                    {loading ? <Loader/> : (
                        <Fragment>
                            <div className="login-clean">
                                <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} style={{marginTop: '-150px', position: 'fixed'}}>
                                    <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                                </a>
                                <form method="put" onSubmit={submitHandler} encType='multipart/form-data'  style={{maxWidth: '500px'}}>
                                    <h2 className="sr-only">Update Homepage</h2>
                                    <div className="div-forgot-password">
                                        <h3 className="forgot-password-heading">Update Homepage </h3>
                                    </div>
                                    <div className="form-group">
                                        <h6>Main Background</h6>
                                        <figure className='mr-3 item-rtl'>
                                            <img 
                                                src={titleBgPreview}
                                                className='small-avatar'
                                                alt='Main Background Preview'
                                            />
                                        </figure>
                                        <input 
                                            type="file" 
                                            id="titleBackground" 
                                            name="titleBackground" 
                                            accept="images/*"
                                            onChange={changeTitleBg}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Product Description</h6>
                                        <textarea 
                                            type="text" 
                                            className="form-control" 
                                            id="productDescription" 
                                            name="productDescription" 
                                            placeholder={productDescription}
                                            value={productDescription}
                                            style={{width: '100%', height: '150px'}}
                                            onChange={(e) => setProductDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Product Image (Left)</h6>
                                        <figure className='mr-3 item-rtl'>
                                            <img 
                                                src={prodImgLeftPreview}
                                                className='small-avatar'
                                                alt='Product Image Left Preview'
                                            />
                                        </figure>
                                        <input 
                                            type="file" 
                                            id="productImageLeft" 
                                            name="productImageLeft" 
                                            accept="images/*"
                                            onChange={changeProdImgLeft}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Product Image (Right)</h6>
                                        <figure className='mr-3 item-rtl'>
                                            <img 
                                                src={prodImgRightPreview}
                                                className='small-avatar'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                        <input 
                                            type="file" 
                                            id="productImageRight" 
                                            name="productImageRight" 
                                            accept="images/*"
                                            onChange={changeProdImgRight}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <h6>Services Description</h6>
                                        <textarea 
                                            type="text" 
                                            className="form-control" 
                                            id="servicesDescription" 
                                            name="servicesDescription" 
                                            value={servicesDescription}
                                            style={{width: '100%', height: '150px'}}
                                            onChange={(e) => setServicesDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Services Background</h6>
                                        <figure className='mr-3 item-rtl'>
                                            <img 
                                                src={servicesBgPreview}
                                                className='small-avatar'
                                                alt='Avatar Preview'
                                            />
                                        </figure>
                                        <input 
                                            type="file" 
                                            id="servicesBackground" 
                                            name="servicesBackground" 
                                            accept="images/*"
                                            onChange={changeServicesBg}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            className="btn btn-primary btn-block" 
                                            type="submit"
                                            disabled={updateLoading ? true : false}
                                        >
                                            Update Home
                                        </button>
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
