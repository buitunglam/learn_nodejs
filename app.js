const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

const authRoute = require('./routes/authRoutes');
// middleware
// make folder public static to use some file like: style.css, image...etc
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://LamBui:Abc123$$$@nodelearn.kle7b.mongodb.net/NodeAuth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoute);

// cookies

app.get('/set-cookies', function(req, res) {
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); // name cookies, value, time alive cookies. httpOnly is use for prevent using javascript to set cookies
  res.send('you got the cookies');
});

app.get('/read-cookies', function(req, res){
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})