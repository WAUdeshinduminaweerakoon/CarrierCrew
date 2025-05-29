const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employerSchema = new mongoose.Schema({
    company: {
        name: String,
        email: String,
        telephone: String,
        companyType: String,
        address: String,
        nearestCity: String,
    },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    mobileNumber: String,
    nic: String,
    address: String,
    nearestCity: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    userType: { type: String, default: 'Employer' },
}, { timestamps: true });

// Hash password before saving
employerSchema.pre('save', async function (next) {
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
employerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Employer', employerSchema);
