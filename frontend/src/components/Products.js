import React, { Fragment, useState, useEffect } from 'react'
import '../css/products.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, clearErrors } from '../actions/productActions'

import ProductDisplay from './product/ProductDisplay'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'


const Products = () => { 
    const [currentPage, setCurrentPage] = useState(1);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);
    const [category, setCategory] = useState('');

    const categories = [
        'Category1',
        'Category2',
        'Category3',
        'Category4',
        'Category5',
        'Category6',
        'Category7'
    ]
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProducts(currentPage, category));
    }, [dispatch, alert, error, currentPage, category]);

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
                                                {categories.map( category => (
                                                    
                                                    <li style={{listStyleType: 'none', cursor: 'pointer', display: 'inline-block', paddingLeft: '10px', paddingRight: '10px'}}
                                                        key={category}
                                                        onClick={() => {setCurrentPageNo(1); setCategory(category)}}>
                                                            <a>{category}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                            {category && (
                                                <a href='/our-products'>View All Products</a>
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
