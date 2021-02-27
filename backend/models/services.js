const mongoose = require('mongoose')

const servicesSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true,
        default: 'fa-check-circle-o'
    }
})

module.exports = mongoose.model('Services', servicesSchema);