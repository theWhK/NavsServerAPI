const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    category: {
        name: String,
        description: String
    }
});

module.exports = mongoose.model('Product', productSchema);