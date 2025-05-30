const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jobSeekerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    mobileNumber: String,
    nic: String,
    address: String,
    nearestCity: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    gender: String,
    userType: { type: String, default: 'JobSeeker' },
}, { timestamps: true });

// Hash password before saving
jobSeekerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare password method for login
jobSeekerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
