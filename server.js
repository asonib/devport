const express = require('express');
const bodyParser = require('body-parser');

const app = express();
require('./config/db');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});