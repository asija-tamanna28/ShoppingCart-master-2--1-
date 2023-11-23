const mongoose = require('mongoose');

const CartproductSchema = new mongoose.Schema({
 name: String,
 price: Number,
 quantity: Number
});

module.exports = mongoose.model('CartProduct', CartproductSchema);