let Product = require('../models/product'),
    mongoose = require('mongoose')


/**
 * Get All
 */
exports.getAll = async () => {
    const res = await Product.find()
    return res
}

/**
 * Get by ID
 */
exports.getById = async (id) => {
    const res = await Product.findById(id)
    return res
}

/**
 * Put
 */
exports.put = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        
    })
}