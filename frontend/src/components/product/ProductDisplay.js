import React from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({ product }) => {

    function getName(name) {
        var x = name;
        var y = x.split(' ')
        var z = x.split(' ').slice(0,5).join(' ');

        if(y.length > 5) {
            z = z + "..."
        }
        
        return z
    }
    return (
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 product-image">
            <div>
                <img alt={`Image of ${product.name}`} height="250px" src={product.image.url}/>
            </div>
            <Link to={`/our-products/${product._id}`} class="product-name text-nowrap">
                {getName(product.name)}
            </Link>
        </div>
    )
}

export default ProductList
