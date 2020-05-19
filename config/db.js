const config = require('./keys');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://asonib:ASBdev75@classifier-htisx.mongodb.net/react-app?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error Connecting To Database');
});