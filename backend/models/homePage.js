const mongoose = require('mongoose')

const homePageSchema = mongoose.Schema({

    productDescription: {
        type: String,
        required: true
    },
    productImageLeft: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    productImageRight: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    titleBackground: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    servicesBackground: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    servicesDescription: {
        type: String,
        required: true
    }


   

})

module.exports = mongoose.model('HomePage', homePageSchema);