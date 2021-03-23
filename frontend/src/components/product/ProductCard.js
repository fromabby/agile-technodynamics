import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    function getName(name) {
        var x = name
        var y = x.split(' ')
        var z = x.split(' ').slice(0,5).join(' ')

        if(y.length > 5) {
            z = z + "..."
        }
        
        return z
    }

    return (
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 product-image">
            <div className="row-image-container"
                style={{
                    background: "url("+`${product.image.url}`+") center / auto no-repeat", 
                    backgroundSize: "contain",
                }}
            >
            </div>
            <Link to={`/product/${product._id}`} class="product-name text-nowrap">
                {getName(product.name)}
            </Link>
        </div>
    )
}

export default ProductCard
