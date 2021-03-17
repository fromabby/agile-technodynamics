const mongoose = require('mongoose')

const servicesSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please enter title']
    },
    subtitle:{
        type: String,
        required: [true, 'Please enter subtitle']
    },
    icon:{
        type: String,
        required: [true, 'Please enter icon'],
        default: 'fa-check-circle-o'
    },
    description:{
        type: String,
        required: [true, 'Please enter description']
    },
    iconBackground:{
        type: String,
        required: [true, 'Please enter icon background'],
        default: 'primary'
    }
})

module.exports = mongoose.model('Services', servicesSchema)