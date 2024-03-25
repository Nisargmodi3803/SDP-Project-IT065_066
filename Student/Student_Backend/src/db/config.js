const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb+srv://nisargmodi2523:NisargModi@cluster0.mfokjqy.mongodb.net/Learning-platform-website');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToMongoDB();
