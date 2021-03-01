const mongoose = require('mongoose')

const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear(); 
    const hrs = String(today.getHours()).padStart(2,'0');
    const minutes = String(today.getMinutes()).padStart(2,'0');
    const todayDate = mm + '/' + dd + '/' + yyyy;
    const todayTime = hrs +':'+ minutes;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
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
                'Uninterrupted Power System',
                'Battery Monitoring System',
                'Batteries',
                'Transformers',
                'Partial Discharge Detection',
                'Battery Discharge Capacity Tester',
                'Battery Impedance or Internal Resistance',
                'Load Banks',
                'Battery Test Monitor',
                'Portable Direct Ground Fault Finder',
                'Earth Tester or Clamp Type',
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