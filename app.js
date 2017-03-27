var express = require('express');
var bodyParser = require('body-parser');
var app = express()

// const users = require('./routes/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/api/users', users)


app.listen(3000, function () {
  console.log('app listening on port 3000!');
});

module.exports = app
