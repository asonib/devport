const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
require('./config/db');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

if(process.env.NODE_ENV === 'production'){
    //set static path
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});