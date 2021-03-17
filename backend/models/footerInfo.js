const mongoose = require('mongoose')

const footerInfoSchema = mongoose.Schema({
    footerTitle:{
        type: String,
        required: [true, 'Please enter footer title']
    },
    footerDescription:{
        type: String,
        required: [true, 'Please enter footer description']
    },
    addressInfo:{
        type: String,
        required: [true, 'Please enter address info']
    },
    phoneInfo:{
        type: String,
        required: [true, 'Please enter phone info']
    },
    cellphoneInfo:{
        type: String,
        required: [true, 'Please enter cellphone info']
    },
    emailInfo:{
        type: String,
        required: [true, 'Please enter email info']
    }
})

module.exports = mongoose.model('FooterInfo', footerInfoSchema)