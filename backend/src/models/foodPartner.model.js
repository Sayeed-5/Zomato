const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    phone: {
        type: String, 
    },
    address: {
        type: String, 
    },
    password: {
        type: String, 
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('FoodPartner', foodPartnerSchema);