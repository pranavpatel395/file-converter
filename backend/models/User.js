const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Path `username` is required.'],
        unique: true,
    },
    fullname: {
        type: String,
        required: [true, 'Path `fullname` is required.'],
    },
    email: {
        type: String,
        required: [true, 'Path `email` is required.'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Path `password` is required.'],
    }
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10); // Hash password
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
