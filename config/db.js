const config = require('./keys');
const mongoose = require('mongoose');
const mongoURI = config.Keys.mongoURI;

exports.MongoDB = mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error Connecting To Database');
});