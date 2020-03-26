const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    description:  { type: String, required: true },
    quantity: {type: Number, required: true }
}, {timestamps: true});

// this tells mongoose what to name the new collection if/when it creates one.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;