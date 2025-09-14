const express = require('express');
const router = express.Router();
const multer = require('multer');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage(),
});
 
router.post('/' ,upload.single('video'), authMiddleware.authPartnerMiddleware, foodController.createFoodItem);

router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems)

module.exports = router;