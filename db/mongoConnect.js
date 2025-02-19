const mongoose = require('mongoose');
const { config } = require('../config/secret');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@cluster0.lt5mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectDB;