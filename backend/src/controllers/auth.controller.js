const userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    res.cookie('Token', token)

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

    res.cookie('Token', token)

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
    res.clearCookie("Token");
    res.status(200).json({ message: "User logged out successfully" });
}

module.exports = {
    register,
    login,
    logout
}