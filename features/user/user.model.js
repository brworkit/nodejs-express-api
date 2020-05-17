const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// username: { type: String, unique: true },
const schema = new Schema({
    username: { type: String},
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    side: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    birth: { type: Date, required: false },
    agreement: { type: Boolean, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);