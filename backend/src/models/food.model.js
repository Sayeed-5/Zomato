const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodPartner',
    },
    likesCount : {
        type : Number,
        default : 0
    }
}, { timestamps : true}) 

module.exports = mongoose.model('Food', foodSchema);