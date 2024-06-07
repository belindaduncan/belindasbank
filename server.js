var express = require('express');
var app = express();
var cors = require('cors');
var dal  = require('./dal.js');

app.use(express.static('public'));
app.use(cors());
 
app.get('/account/create/:name/:email/:password', function(req, res) {
    dal.create(req.params.name, req.params.email, req.params.password)
        .then(user => {
            console.log(user);
            res.send(user);
        });
});

app.post('/account/login', express.json(), (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password); // Add this line for debugging
    dal.login(email, password)
        .then(user => {
            console.log('Login successful:', user);
            res.json({ user: user });
        })
        .catch(error => {
            console.error('Login error:', error);
            res.status(401).json({ error: error.message });
        });
});

app.get('/account/all', function(req, res) {
    dal.all()
        .then(docs => {
            console.log(docs);
            res.send(docs);
        })
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});