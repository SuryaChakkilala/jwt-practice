const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    posted: {
        type: Date,
        default: Date.now()
    },
    price: Number
})

exports.Product = mongoose.model('Product', productSchema)