import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { getProducts, clearErrors } from '../actions/productActions'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'
import ProductDisplay from './product/ProductDisplay'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import '../css/products.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'

const ProductsOthers = () => { 
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const [category, setMainCategory] = useState('Others')
    const [subcategory, setSubCategory] = useState('Others')
    const [currentPage, setCurrentPage] = useState(1)

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    
    if(category) {
        count = filteredProductsCount
    }

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

    return (
        <Fragment>
            <MetaData title={`${category}`}/>
            <div class="container-fluid">
                <div class="product-header-container">
                    <h1 class="text-center product-text">OUR PRODUCTS</h1>
                    <h3 class="text-center product-category">{category}</h3>
                </div>
                <div class="container product-list-container">
                    <div class="list-products">
                        <div class="row product-container-row">
                            {loading ? <Loader/> : (
                                <Fragment>
                                    {loading ? <Loader/> : (
                                    <Fragment>
                                        {products && (products.length != 0) ? products.map( product => (
                                            <ProductDisplay key={product._id} product={product}/>
                                        )) : (
                                            <h3 style={{margin: '10px 0'}}>No products found.</h3>
                                        )}
                                    </Fragment>
                                )}
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
    )
}

export default ProductsOthers;
