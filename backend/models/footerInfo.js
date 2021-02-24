const mongoose = require('mongoose')

const footerInfoSchema = mongoose.Schema({

    footerTitle:{
        type: String,
        required: true
    },
    footerDescription:{
        type: String,
        required: true
    },
    addressInfo:{
        type: String,
        required: true
    },
    phoneInfo:{
        type: String,
        required: true
    },
    cellphoneInfo:{
        type: String,
        required: true
    },
    emailInfo:{
        type: String,
        required: true
    }


})

module.exports = mongoose.model('FooterInfo', footerInfoSchema);