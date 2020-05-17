# Modules Used
<pre>
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
</pre>
