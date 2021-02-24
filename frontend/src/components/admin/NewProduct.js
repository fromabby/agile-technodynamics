import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'

const NewProduct = ( { history } ) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        ' - ',
        'Category1',
        'Category2',
        'Category3',
        'Category4',
        'Category5',
        'Category6',
        'Category7'
    ]

    const { loading, error, success } = useSelector(state => state.newProduct);

    const { user } = useSelector(state => state.auth)
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

        if(success) {
            history.push('/admin/products');
            alert.success('Product created successfully.')

            dispatch({
                type: NEW_PRODUCT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        formData.set('category', category);

        images.forEach(image => {
            formData.append('images', image)
        });

        dispatch(newProduct(formData));
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>
            <MetaData title={'New Product'}/>
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
                    <Fragment>
                    <div className="login-clean">
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} style={{marginTop: '-150px', position: 'fixed'}}>
                            <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                        </a>
                        <form method="post" onSubmit={submitHandler} encType='multipart/form-data' style={{maxWidth: '500px'}}>
                            <h2 className="sr-only">New Product</h2>
                            <div className="div-forgot-password">
                                <h3 className="forgot-password-heading">New Product</h3>
                            </div>
                            <div className="form-group">
                                <h6>Name</h6>
                                <textarea 
                                    type="text" 
                                    className="form-control" 
                                    name="product_name"
                                    value={name}
                                    style={{width: '100%'}}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <h6>Description</h6>
                                <textarea
                                    type="text" 
                                    className="form-control" 
                                    name="product_name"
                                    style={{width: '100%', height: '150px'}}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <h6>Category</h6>
                                <div className="dropdown show">
                                    <select 
                                        name="category" 
                                        className="product-dropdown" 
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <h6>Images</h6>
                                <input 
                                    type="file" 
                                    name="product_images" 
                                    onChange={onChange}
                                    multiple
                                />
                            </div>
                            
                            {imagesPreview.map(img => (
                                <img 
                                    src={img} 
                                    key={img} 
                                    alt='Images Preview'
                                    className='mt-3 mr-2' 
                                    width='55' 
                                    height='52'
                                />
                            ))}

                            <div className="form-group">
                                    <button 
                                    className="btn btn-primary btn-block" 
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                    </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default NewProduct
