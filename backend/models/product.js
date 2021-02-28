const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Mechanical Engineering',
                'DC Power Systems',
                'Electrical Engineering Equipment',
                'Test Equipment',
                'Others'
            ]
        }
    },
    subcategory: {
        type: String,
        required: [true, 'Please select subcategory for this product'],
        enum: {
            values: [
                'Pumps and System',
                'Fire Protection Systems',
                'UP System',
                'Battery Monitoring System',
                'Batteries',
                'Transformers',
                'Partial Discharge Detection',
                'Battery Discharge Capacity Tester',
                'Battery Impedance / Internal Resistance',
                'Load Banks',
                'Battery Test Monitor',
                'Portable Direct Ground Fault Finder',
                'Earth Tester / Clamp Type',
                'Others'
            ]
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);