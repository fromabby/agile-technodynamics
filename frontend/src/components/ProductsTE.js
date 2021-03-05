import React, { Fragment, useState, useEffect } from 'react'
import '../css/products.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, clearErrors } from '../actions/productActions'
import ProductDisplay from './product/ProductDisplay'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'

const Products = () => { 
    const [currentPage, setCurrentPage] = useState(1);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);
    const [category, setMainCategory] = useState('Test Equipment');
    const [subcategory, setSubCategory] = useState('');

    const te_subCategory = [
        'Partial Discharge Detection',
        'Battery Discharge Capacity Tester',
        'Battery Impedance or Internal Resistance',
        'Load Banks',
        'Battery Test Monitor',
        'Portable Direct Ground Fault Finder',
        'Earth Tester or Clamp Type',
        'Others'
    ]
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProducts(currentPage, category, subcategory));

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, currentPage, category, subcategory]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    
    if(category) {
        count = filteredProductsCount
    }

    return (
            <Fragment>
                {loading ? <Loader/> : 
                (
                    <Fragment>
                        <MetaData title={'Our Products'}/>
                        <section id="products" className="product-section" style={{paddingTop: '65px'}}>
                            <div className="our-products">
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className="products-heading-title">Our Products</h1>
                                    </div>
                                    <div className="col-12">
                                        <div classNme="mt-5">
                                            <ul className="pl-0">
                                                {te_subCategory.map( category => (
                                                    <li style={{listStyleType: 'none', cursor: 'pointer', display: 'inline-block', paddingLeft: '10px', paddingRight: '10px'}}
                                                        key={category}
                                                        onClick={() => {setCurrentPageNo(1); setSubCategory(category)}}>
                                                            <a>{category}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                            {subcategory && (
                                                <Link to={`/products/${category}`}>View All Products</Link>
                                            )}
                                        </div>
                                    </div>
                                    {products && products.map( product => (
                                        <ProductDisplay key={product._id} product={product}/>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {resPerPage < count && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass='page-item'
                                    linkClass='page-link'
                                />
                            </div>
                        )} 
                        
                    </Fragment>
                )}
            </Fragment>
    )
}

export default Products;