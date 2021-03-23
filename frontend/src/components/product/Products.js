import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import { getProducts, clearErrors } from '../../actions/productActions'
import { INSIDE_DASHBOARD_FALSE } from '../../constants/dashboardConstants'
import ProductCard from './ProductCard'
import Loader from './../layout/Loader'
import MetaData from './../layout/MetaData'
import '../../css/products.css'
import '../../css/bootstrap.min.css'
import '../../fonts/font-awesome.min.css'

const Products = () => { 
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const [category, setMainCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    
    const eee_subCategory = [
        'Transformers',
        'Others'
    ]

    const me_subCategory = [
        'Pumps and System',
        'Fire Protection Systems',
        'Others'
    ]
    
    const dc_subCategory = [
        'Uninterrupted Power System',
        'Battery Monitoring System',
        'Batteries',
        'Others'
    ]

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
            <MetaData title={'Our Products'}/>
            <div className="product-containter-fluid container-fluid">
                <div className="product-header-container">
                    <h1 className="text-center product-text">OUR PRODUCTS</h1>
                    {subcategory ? 
                        <Fragment>
                            <p className="text-center product-category" style={{color: '#0d163f'}}>
                                <a onClick={() => {
                                    setCurrentPageNo(1) 
                                    setMainCategory('Mechanical Engineering')
                                    setSubCategory('')
                                    }}  
                                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                                >{category}</a>
                                &nbsp;
                                <i className="fa fa-angle-right"></i> 
                                &nbsp;
                                {subcategory}
                            </p> 
                        </Fragment>:
                        <p className="text-center product-category" style={{color: '#0d163f'}}>
                            <a onClick={() => {
                                setCurrentPageNo(1) 
                                setMainCategory('')
                                setSubCategory('')
                                }
                            }>{category}</a>
                        </p>
                    }
                    <ul class="product-categories">
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                >
                                    Mechanical Engineering
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {me_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('Mechanical Engineering')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentPageNo(1) 
                                            setMainCategory('Mechanical Engineering')
                                            setSubCategory('')
                                            }
                                        }
                                    >View All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                >
                                    DC Power Systems
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {dc_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            key={currentActive}
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('DC Power Systems')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentPageNo(1) 
                                            setMainCategory('DC Power Systems')
                                            setSubCategory('')
                                            }
                                        }
                                    >View All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                >
                                    Electrical Engineering Equipment
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {eee_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            key={currentActive}
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('Electrical Engineering Equipment')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentPageNo(1) 
                                            setMainCategory('Electrical Engineering Equipment')
                                            setSubCategory('')
                                            }
                                        }
                                    >View All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                >
                                    Test Equipment
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {te_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            key={currentActive}
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('Test Equipment')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentPageNo(1) 
                                            setMainCategory('Test Equipment')
                                            setSubCategory('')
                                            }
                                        }
                                    >View All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                >
                                    Others
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setCurrentPageNo(1) 
                                            setMainCategory('Others')
                                            setSubCategory('')
                                            }
                                        }
                                    >Others</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                    {category ? 
                        <li 
                            className="product-category"
                            onClick={() => {setMainCategory(''); setSubCategory(''); setCurrentPage(1)}}
                            style={{listStyle: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#0d163f', fontSize: '1rem', paddingBottom: '5px', width: '130px', marginLeft: 'auto', marginRight: 'auto'}}    
                        >View All Products</li> :
                        <Link></Link>
                    }
                </div>
                <hr/>
                <div className="container product-list-container">
                    <div className="list-products">
                        <div className="row product-container-row">
                            {loading ? <Loader/> : (
                                <Fragment>
                                    {products && (products.length !== 0) ? products.map( product => (
                                        <ProductCard key={product._id} product={product}/>
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

export default Products