import React, { Fragment, useEffect} from 'react'
import '../../css/individual-product.css'
import { useDispatch, useSelector } from  'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import {Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { INSIDE_DASHBOARD_FALSE } from '../../constants/dashboardConstants'

const ProductDetails = ( { match } ) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)
    
    useEffect(() => {

        dispatch(getProductDetails(match.params.id));

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, match.params.id])

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={product.name}/>
                    <div class="container-fluid individual-product">
                        <div class="row">
                            <div class="col-sm-12 col-md-4 image-container">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map( image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img className="individual-product-image" src={image.url} alt={`${product.name}`}/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                            <div class="col-sm-12 col-md-8 info-container">
                                <div class="row">
                                    <div class="col">
                                        <h3>{product.name}</h3>
                                        <h6>{product.category} <i className="fa fa-angle-right"></i> {product.subcategory}</h6>
                                        <p style={{paddingTop: '10px'}}>{product.description}</p>
                                    </div>
                                </div>
                                <div class="row d-flex link">
                                    <div class="col my-link">
                                    <Link className="link-back" to="/our-products">
                                        Back to Products <i className="fa fa-angle-right"></i>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
