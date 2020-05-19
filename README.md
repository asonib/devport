# Modules Used
<pre>
<h3> Express </h3>

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000);
<h3> Mongoose </h3>
<pre>
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  <h5>Schema Definition </h5>
  <pre>
  const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});
  </pre>
});
</pre>
<h3> Bcrypt </h3>
  var bcrypt = require('bcryptjs');
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash("B4c0/\/", salt, function(err, hash) {
          // Store hash in your password DB.
      });
  });
  
  // Load hash from your password DB.
  bcrypt.compare("B4c0/\/", hash, function(err, res) {
      // res === true
  });
 <h3> Json Web Token</h3>
 jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
  });
  // verify a token symmetric
jwt.verify(token, 'shhhhh', function(err, decoded) {
    console.log(decoded.foo) // bar
  });
  
  <h3> Gravatar </h3>
  gravatar.url(email);
  gravatar.url(email, options);
  gravatar.url(email, options, protocol);
  
  <h3> Express Validator </h3>
  app.post('/user', [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }  
</pre>
