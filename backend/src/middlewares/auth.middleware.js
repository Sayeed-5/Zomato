const FoodPartner = require('../models/foodPartner.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authPartnerMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(req.cookies.token);
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await FoodPartner.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

const authUserMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

module.exports = {
    authPartnerMiddleware,
    authUserMiddleware
}