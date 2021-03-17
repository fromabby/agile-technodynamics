const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title']
    },
    description: {
        type: String,
        required: [true, 'Please enter description']
    }
})

module.exports = mongoose.model('About', aboutSchema)