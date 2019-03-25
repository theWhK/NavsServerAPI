const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let personSchema = new Schema({
    name: String,
    cpf: String,
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
});

module.exports = mongoose.model('Person', personSchema);