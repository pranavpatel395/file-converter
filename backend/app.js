const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // Ensure correct import
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Configure CORS to allow Authorization headers
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));


app.use(express.json());
console.log(path.join(__dirname, 'uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

// Catch 404 errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
