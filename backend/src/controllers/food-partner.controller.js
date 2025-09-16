const foodPartnerSchema = require('../models/foodPartner.model');
const foodSchema = require('../models/food.model');

const getFoodPartnerById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodPartner = await foodPartnerSchema.findById(id);
        const foodsByFoodPartner = await foodSchema.find({ foodPartner: id }); //agar kuch galat he to yahan ho sakta he id ke jagah

        if (!foodPartner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }
        res.status(200).json({
            message : 'Food Partner fetched successfully',
            foodPartner : {
                ...foodPartner.toObject(),
                foodItems: foodsByFoodPartner
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getFoodPartnerById
}