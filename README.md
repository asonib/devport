# A MERN Application for developers to connect.
<h3>Modules Used</h3>

<h3> Express </h3>
<pre>
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
});
</pre>

app.listen(3000);
<h3> Mongoose </h3>
<pre>
  mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
</pre>
<b>Schema Definition</b>
  <pre>
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const BlogPost = new Schema({
      author: ObjectId,
      title: String,
      body: String,
      date: Date
    });
  });
</pre>
<h3> Bcrypt </h3>
<pre>
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
  </pre>
 <h3> Json Web Token</h3>
 <pre>
 jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
  });
  // verify a token symmetric
jwt.verify(token, 'shhhhh', function(err, decoded) {
    console.log(decoded.foo) // bar
  });
  </pre>
  
  <h3> Gravatar </h3>
  <pre>
  gravatar.url(email);
  gravatar.url(email, options);
  gravatar.url(email, options, protocol);
  </pre>
  
  <h3> Express Validator </h3>
  <pre>
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
    
  <h3>Concurrently</h3>
  <pre>
  npm install concurrently --save
  In package.json, escape quotes:
  "start": "concurrently \"command1 arg\" \"command2 arg\""
  </pre>
  <h3>Nodemon</h3>
  <pre>
  To run the backend server automatically when any changes are done.
  </pre>

  <h3> Client - React</h3>
  <pre>
  npx create-react-app my-app
  cd my-app
  npm start
  </pre>

  <h3>Deployment - building static assets</h3>
 <pre>
  npm run build
 </pre>

