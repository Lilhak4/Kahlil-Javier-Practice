const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

// -------Need to create user model

const User = require('../models/user');

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
  }

  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
  }
  if (!req.body.username || !req.body.password) {
    res.redirect('auth/signup');
  }
  User.findOne({username: req.body.username})
    .then((user) => {
      if (user) {
        return res.redirect('auth/signup');
      }
      // ------This is where the encryption goes
    });
});
