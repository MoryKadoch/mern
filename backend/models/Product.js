const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type : String,
    },
    stock:{
        type: Integer,
    },
    img:{
        type: String,
    }
})
module.exports = Product = mongoose.model('Product', ProductSchema, 'Product');