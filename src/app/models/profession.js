const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let jobSchema = new Schema({
    description: String
});

module.exports = mongoose.model('Job', jobSchema);