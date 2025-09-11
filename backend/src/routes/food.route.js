const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/' , authMiddleware.authPartnerMiddleware, foodController.createFoodItem);

module.exports = router;