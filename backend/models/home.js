const mongoose = require('mongoose')

const homeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    image: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    }

})
module.exports = mongoose.model('Home', homeSchema);