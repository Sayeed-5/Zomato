const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// User Authentication Routes
router.post('/user/register', authController.register)
router.post('/user/login', authController.login)
router.get('/user/logout', authController.logout)

// Food Partner Authentication Routes
router.post('/partner/register', authController.partnerRegister)
router.post('/partner/login', authController.partnerLogin)
router.get('/partner/logout', authController.partnerLogout)


module.exports = router;