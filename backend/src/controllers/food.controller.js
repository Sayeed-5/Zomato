const foodSchema = require('../models/food.model');

const createFoodItem = async (req, res) => {
    // try {
    //     const { name, description, price, category } = req.body;
    //     if (!name || !description || !price || !category) {
    //         return res.status(400).json({ message: 'All fields are required' });
    //     }

    //     const newFoodItem = new foodSchema({
    //         name,
    //         description,
    //         price,
    //         category,
    //         partnerId: req.user.id // Assuming req.user is set by auth middleware
    //     });

    //     await newFoodItem.save();
    //     res.status(201).json({ message: 'Food item created successfully', foodItem: newFoodItem });
    // } catch (error) {
    //     console.error('Error creating food item:', error);
    //     res.status(500).json({ message: 'Server error' });
    // }

    console.log(req.foodPartner);

    res.send('Create Food Item');
}

module.exports = {
    createFoodItem
}