import React, { Fragment } from 'react'
import { Col } from 'react-bootstrap'
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
        <Fragment>
            <Col style={{padding: '10px 0 15px 0', marginLeft: '10px'}}>
                <img src={`${product.image.url}`} height='200px' width='200px' className='mb-3'/>
                <br/>
                <Link to={`/product/${product._id}`} className="text-nowrap">
                    {getName(product.name)}
                </Link>
            </Col>
        </Fragment>
    )
}

export default ProductCard
