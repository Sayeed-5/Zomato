const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model');
const foodPartnerSchema = require('../models/foodPartner.model');

const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    const isUserExsist = await userSchema.findOne({ email });

    if (isUserExsist) {
        return res.status(400)
        .json({ message: 'User already exsist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userSchema.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie('UserToken', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
    
}

const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
        return res.status(400)
        .json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400)
        .json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie('UserToken', token)

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}

const logout = (req, res) => {
    res.clearCookie("UserToken");
    res.status(200).json({ message: "User logged out successfully" });
}

const partnerRegister = async (req, res) => {

    const { name, email, phone, address, password } = req.body;

    const isAccountExsist = await foodPartnerSchema.findOne({ email });

    if (isAccountExsist) {
        return res.status(400)
        .json({ message: 'Account already exsist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerSchema.create({
        name,
        email,
        phone,
        address,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie('PartnerToken', token)

    res.status(201).json({
        message: 'Food Partner registered successfully',
        foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    })
}

const partnerLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await foodPartnerSchema.findOne({ email });

    if (!user) {
        return res.status(400)
        .json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400)
        .json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie('PartnerToken', token)

    res.status(200).json({
        message: 'Food Partner logged in successfully',
        foodPartner: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address
        }
    })
}

const partnerLogout = (req, res) => {
    res.clearCookie("PartnerToken");
    res.status(200).json({ message: "Food Partner logged out successfully" });
}

module.exports = {
    register,
    login,
    logout,
    partnerRegister,
    partnerLogin,
    partnerLogout
}