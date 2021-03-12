import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'
import { Popover, OverlayTrigger} from 'react-bootstrap'
import imageCompression from 'browser-image-compression';

const imgTooltip = (
    <Popover id="popover-basic">
      <Popover.Content>
          Image file must be below 750 Kb.
      </Popover.Content>
    </Popover>
);

const UpdateProduct = ( { match, history } ) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setMainCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [imagePreview, setImagePreview] = useState('')
    const [useDefaultImage, setUseDefaultImage] = useState('')
    
    const [isChecked, setChecked] = useState('false')


    const checkboxCheck = () => {
        setChecked(!isChecked)
    }

    const categories = [
        ' - ',
        'Mechanical Engineering',
        'DC Power Systems',
        'Electrical Engineering Equipment',
        'Test Equipment',
        'Others'
    ]

    const me_subCategory = [
        '-',
        'Pumps and System',
        'Fire Protection Systems',
        'Others'
    ]

    const dc_subCategory = [
        '-',
        'Uninterrupted Power System',
        'Battery Monitoring System',
        'Batteries',
        'Others'
    ]
    
    const eee_subCategory = [
        '-',
        'Transformers',
        'Others'
    ]

    const te_subCategory = [
        '-',
        'Partial Discharge Detection',
        'Battery Discharge Capacity Tester',
        'Battery Impedance or Internal Resistance',
        'Load Banks',
        'Battery Test Monitor',
        'Portable Direct Ground Fault Finder',
        'Earth Tester or Clamp Type',
        'Others'
    ]

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    const { user } = useSelector(state => state.auth)

    const productId = match.params.id

    const [isToggled, setToggled] = useState('false')
    
    const handleToggle = () => {
        setToggled(!isToggled)
    }

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }

    useEffect(() => {

        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        }
        else { 
            setName(product.name)
            setDescription(product.description)
            setMainCategory(product.category)
            setSubCategory(product.subcategory)
            setImagePreview(product.image)
        }

        if(error){
            history.push('/admin/products')
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            history.push('/admin/products')
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated) {
            history.push('/admin/products');
            alert.success('Product updated successfully.')

            dispatch({
                type: UPDATE_PRODUCT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, product, productId, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        formData.set('category', category);
        if(String(category).includes("Others")) {
            formData.set('subcategory', "Others");
        } else {
            formData.set('subcategory', subcategory);
        }
        formData.set('useDefaultImage', useDefaultImage)
        formData.set('image', image)

        dispatch(updateProduct(product._id, formData));
    }

    const handleImageUpload = e => {
        var imageFile = e.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        var options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
                addImage(compressedFile); // write your own logic
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }

    const addImage = file => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setImagePreview(reader.result)
                setImage(reader.result)
            }
        }

        reader.readAsDataURL(file)
    }

    const discardChanges = () => {
        if(window.confirm('Are you sure you want to discard changes?')) {
            history.push('/admin/products')
        }
    }
    
    return (
        <Fragment>
            <MetaData title={'Update Product'}/>
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
                    <div className="container-fluid">
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle} >
                            <i className="fa fa-bars"   ></i>
                        </a>
                        <Fragment>
                        <div className="login-clean">
                            
                            <form method="put" onSubmit={submitHandler} encType='multipart/form-data'   >
                                <h2 className="sr-only">Update Product</h2>
                                <div className="div-forgot-password">
                                    <h3 className="forgot-password-heading">Update Product</h3>
                                </div>
                                <div className="form-group">
                                    <h6>Name</h6>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="product_name"
                                        value={name}
                                        placeholder="Product Name"
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
                                        value={description}
                                        placeholder="Product Description"
                                        style={{width: '100%', height: '150px'}}
                                        onChange={(e) => setDescription(e.target.value)}
                                        height='55px'
                                    />
                                </div>
                                <div className="form-group">
                                <h6>Main Category</h6>
                                <div className="dropdown show">
                                    <select 
                                        name="mainCategory" 
                                        className="product-dropdown" 
                                        id="mainCategory"
                                        value={category}
                                        onChange={(e) => setMainCategory(e.target.value)}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <h6>Sub Category</h6>
                                <div className="dropdown show">
                                    <select 
                                        name="subCategory" 
                                        className="product-dropdown" 
                                        id="subCategory"
                                        value={subcategory}
                                        disabled={String(category).includes("Others") ? true : false}
                                        onChange={(e) => setSubCategory(e.target.value)}
                                    >
                                    
                                    {String(category).includes("Mechanical Engineering") ? (
                                        <Fragment>
                                            {me_subCategory.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </Fragment>
                                    ) : ((String(category).includes("DC Power Systems") ? (
                                        <Fragment>
                                            {dc_subCategory.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </Fragment>) : (
                                            (String(category).includes("Electrical Engineering Equipment")) ? (
                                                <Fragment>
                                                    {eee_subCategory.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </Fragment>
                                            ) : (
                                                (String(category).includes("Test Equipment")) ? (
                                                    <Fragment>
                                                        {te_subCategory.map(category => (
                                                            <option key={category} value={category}>{category}</option>
                                                        ))}
                                                    </Fragment>) : (
                                                        <Fragment>
                                                            <option key="Others" value="Others">Others</option>
                                                        </Fragment>)
                                                )
                                            )))
                                        }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">  
                                    <h6>Images 
                                        <span className='fa-m' style={{margin: 'auto', paddingLeft: '5px'}}>
                                            <OverlayTrigger trigger="hover" placement="right" overlay={imgTooltip}>
                                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </span>
                                    </h6>
                                    <input 
                                        type="file" 
                                        name="product_images" 
                                        onChange={handleImageUpload}
                                    />
                                    <br/>

                                </div>
                                
                                {oldImages && oldImages.map(img => (
                                    <img 
                                        className='mt-3 mr-2'
                                        src={img.url}
                                        alt={img.url}
                                        key={img}
                                        width='55' 
                                        height='52'
                                    />

                                ))}

                                {imagesPreview.map(img => (
                                    <img 
                                        src={img} 
                                        key={img} 
                                        alt='Images Preview'
                                        className='mt-3 mr-2' 
                                        width='110' 
                                        height='104'
                                    />
                                ))}

                                <div className="form-group">
                                        <button 
                                        className="btn btn-primary btn-block" 
                                        type="submit"
                                    >
                                        Update Product
                                    </button>
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-secondary btn-block mt-2"
                                        onClick={() => discardChanges()}
                                    >Discard</button>
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

export default UpdateProduct
