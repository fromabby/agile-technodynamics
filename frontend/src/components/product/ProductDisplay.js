import React from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({ product }) => {
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 product-display-container">
                <img className="product-image center" alt="the product" src={product.images[0].url}/>
                <Link to={`/our-products/${product._id}`}><h6 className="product-section-h5">{product.name}</h6></Link>
        </div>
    )
}

export default ProductList
