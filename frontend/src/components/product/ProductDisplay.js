import React from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({ product }) => {
    return (
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 product-image">
            <div>
                <img alt={`Image of ${product.name}`} src={product.images[0].url}/>
            </div>
            <Link to={`/our-products/${product._id}`} class="product-name">
                {product.name}
            </Link>
        </div>
    )
}

export default ProductList
