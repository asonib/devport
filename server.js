const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/db');

const app = express();
config.MongoDB;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});