const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    price: Number
})

module.exports = mongoose.model('Product', productSchema)
