const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    requestor_id:  { type: String, required: true },
    product_id:  { type: String, required: true },
    quantity: {type: Number, required: true },
    status: { type: String, required: true},
    fulfilled_by: {type: Array}
}, {timestamps: true});

// this tells mongoose what to name the new collection if/when it creates one.
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;