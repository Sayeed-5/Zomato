const FoodPartner = require('../models/foodPartner.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authPartnerMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.PartnerToken;
        
        if (!token) {
            return res.status(401).json({ message: 'Partner Please Login First' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await FoodPartner.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({ message: 'Invalid token partner not present' });
        }

        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

const authUserMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.UserToken;
        if (!token) {
            return res.status(401).json({ message: 'User Please Login First' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token user not present' });
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