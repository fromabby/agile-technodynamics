import React, { Fragment, useEffect} from 'react'
import '../../css/individual-product.css'
import { useDispatch, useSelector } from  'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import {Carousel} from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

    }, [dispatch, alert, error, match.params.id])

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={product.name}/>
                    <section className="individual-product-section">
                        <div className="row individual-products">
                            <div className="col-sm-5 col-md-5 col-lg-5 offset-lg-0">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map( image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img className="product-image" src={image.url} alt={`${product.name}`}/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                            <div className="col-sm-7 col-md-7 col-lg-7 offset-lg-0">
                                <h3 className="individual-product-name">{product.name}</h3>
                                <p>{product.description}</p>
                                <Link className="link-back" to="/our-products">Back to Products <i className="fa fa-angle-right"></i>&nbsp;
                                </Link>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails
