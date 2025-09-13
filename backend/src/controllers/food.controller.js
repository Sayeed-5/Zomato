const foodSchema = require('../models/food.model');
const { uploadFile } = require('../services/storage.service');
const { v4:uuid } = require('uuid');

const createFoodItem = async (req, res) => {
    
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    const foodItem = {
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
    };
 
    res.status(201).json({
        food: foodItem,
        message: 'Food item created successfully'
    });
}

const getFoodItems = async (req, res) => {
    const foodItems = await foodSchema.find({ foodPartner: req.foodPartner._id });

    res.status(200).json({
        foodItems,
        message: 'Food items fetched successfully'
    });
}

module.exports = {
    createFoodItem,
    getFoodItems
}