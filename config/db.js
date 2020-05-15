const config = require('./keys');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/react-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error Connecting To Database');
});