const config = require('./keys');
const mongoose = require('mongoose');

mongoose.connect(config.mongoLocal, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error Connecting To Database');
});