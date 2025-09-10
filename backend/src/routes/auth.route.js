const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/user/register', authController.register)
router.post('/user/login', authController.login)
router.get('/user/logout', authController.logout)


module.exports = router;