const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Your existing routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth2', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/verify', require('./routes/otpRoutes.js'));
app.use('/api/subscription', require('./routes/subscriptionRoutes.js'));
app.use('/api/admin', require('./routes/adminRoutes.js'));
// app.use('/api/employers', require('./routes/employers'));  
app.use('/api/employers', require('./routes/employerRoutes'));


const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
