import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/Sidebar-Menu.css'
import '../../css/Sidebar-Menu-1.css'
import '../../css/bootstrap.min.css'
import '../../css/dashboard.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { logout } from './../../actions/userActions'

const ProductsList = ( {history} ) => {
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products)
    const { deleteError, isDeleted } = useSelector(state => state.product)
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
        dispatch(getAdminProducts());

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Product has been deleted successfully.');
            history.push('/admin/products')

            dispatch({
                type: DELETE_PRODUCT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, history, isDeleted, deleteError])

    const setProducts = () => {
        const data = { 
            columns: [
                {
                    label: 'Product Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
         }

         products.forEach(product => {
             data.rows.push({
                name: product.name,
                description: product.description,
                category: product.category,
                actions: <Fragment>
                            <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                                <i className='fa fa-pencil'></i>
                            </Link>
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </Fragment>
             })
         })
         return data
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    
    return (
        <Fragment>
            <MetaData title={'All Products'}/>
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
                        <Fragment>
                            <div style={{padding: '30px'}}>
                                <h1 className="mt-3 mb-3 ml-10 mr-10">
                                    All Products
                                </h1>
                                <Link to='/admin/newProduct'>
                                    <button className='btn btn-dark btn-sm text-capitalize ml-3 mb-5'>
                                        Add New Product
                                    </button>
                                </Link>
                                {loading ? <Loader/> : (
                                    <MDBDataTable
                                        data={setProducts()}
                                        className='px-10 table-sm'
                                        bordered
                                        striped
                                        hover
                                        entries={5}
                                    />
                                )}
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductsList
