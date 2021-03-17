import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, clearErrors } from '../../actions/productActions'
import { INSIDE_DASHBOARD_FALSE } from '../../constants/dashboardConstants'
import ProductDisplay from './ProductDisplay'
import Loader from './../layout/Loader'
import MetaData from './../layout/MetaData'
import '../../css/products.css'
import '../../css/bootstrap.min.css'
import '../../fonts/font-awesome.min.css'

const ProductsDC = () => { 
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const category = 'DC Power Systems'
    const [subcategory, setSubCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const dc_subCategory = [
        'Uninterrupted Power System',
        'Battery Monitoring System',
        'Batteries',
        'Others'
    ]
    
    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount
    
    if(category) {
        count = filteredProductsCount
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProducts(currentPage, category, subcategory))

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, currentPage, category, subcategory])

    return (
        <Fragment>
            <MetaData title={`${category}`}/>
            <div class="container-fluid">
                <div class="product-header-container">
                    <h1 class="text-center product-text">OUR PRODUCTS</h1>
                    <h3 class="text-center product-category">{category}</h3>
                    <ul class="product-categories">
                        {dc_subCategory.map( category => (
                            <li
                                key={category}
                                onClick={() => {
                                    setCurrentPageNo(1)
                                    setSubCategory(category)}
                                }
                                className={subcategory === category ? "current-active" : null}
                            >
                                    <Link>{category}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="container product-list-container">
                    <div class="list-products">
                        <div class="row product-container-row">
                            {loading ? <Loader/> : (
                            <Fragment>
                                {products && (products.length !== 0) ? products.map( product => (
                                    <ProductDisplay key={product._id} product={product}/>
                                )) : (
                                    <h3 style={{margin: '10px 0'}}>No products found.</h3>
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

export default ProductsDC