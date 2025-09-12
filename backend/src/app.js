const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route')
const foodRoutes = require('./routes/food.route')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)

module.exports = app;