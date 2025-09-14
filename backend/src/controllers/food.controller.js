const foodSchema = require('../models/food.model');
const { uploadFile } = require('../services/storage.service');
const storageService = require('../services/storage.service');
const { v4:uuid } = require('uuid');

const createFoodItem = async (req, res) => {

    // console.log("File:", req.file);
    // console.log("Body:", req.body);
    
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodSchema.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
    });
 
    res.status(201).json({
        food: foodItem,
        message: 'Food item created successfully'
    });
}

const getFoodItems = async (req, res) => {
    const foodItems = await foodSchema.find({});

    res.status(200).json({
        foodItems,
        message: 'Food items fetched successfully'
    });
}

module.exports = {
    createFoodItem,
    getFoodItems
}