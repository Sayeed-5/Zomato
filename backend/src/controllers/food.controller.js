const foodSchema = require('../models/food.model');
const likeSchema = require('../models/likes.model');
const saveSchema = require("../models/save.model")
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

const likeFoodItem = async (req, res) => {
    const { foodId } = req.body;
    const user = req.user;

    const existingLike = await likeSchema.findOne({ user: user._id, food: foodId });

    if (existingLike) {
        await likeSchema.deleteOne({ user: user._id, food: foodId });
        await foodSchema.findByIdAndUpdate(foodId, { $inc: { likesCount: -1 } });
        return res.status(200).json({ message: 'Food item unliked successfully' });
    }

    const like = await likeSchema.create({ user: user._id, food: foodId });
    await foodSchema.findByIdAndUpdate(foodId, { $inc: { likesCount: 1 } });
    res.status(201).json({ message: 'Food item liked successfully', like });
}

const saveFoodItem = async (req, res) => {
    const { foodId } = req.body;
    const user = req.user;

    const existingSave = await saveSchema.findOne({ user: user._id, food: foodId });
    if (existingSave) {
        await saveSchema.deleteOne({ user: user._id, food: foodId });
        return res.status(200).json({ message: 'Food item unsaved successfully' });
    }

    const save = await saveSchema.create({ user: user._id, food: foodId });
    res.status(201).json({ message: 'Food item saved successfully', save });

}

module.exports = {
    createFoodItem,
    getFoodItems,
    likeFoodItem,
    saveFoodItem
}