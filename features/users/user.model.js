const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    username: { type: String, required: false, unique: false },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },    
    created: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);