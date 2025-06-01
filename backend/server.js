const express = require('express');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')


// Connect to MongoDB
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Your routes go here...


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth2', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/verify', require('./routes/otpRoutes.js'));
app.use('/api/subscription', require('./routes/subscriptionRoutes.js'));

