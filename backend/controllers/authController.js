const User = require('../models/User'); // Ensure you have this line
const bcrypt = require('bcrypt'); // Ensure bcrypt is required at the top

exports.register = async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
        return res.status(400).json({ message: 'Username, fullname, email, and password are required.' });
    }

    try {
        const newUser = new User({ 
            username, 
            fullname, 
            email, 
            password  // Password will be hashed in the pre-save hook
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare hashed password with the password provided
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


