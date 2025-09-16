const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    foodItem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Food', 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);