const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const saltRounds = 10;

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
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });

      newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })
    .catch(next);
});

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    // return
  }
  // flash message
});

router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  if (!req.body.username || !req.body.password) {
    // req.flash('login-error', 'please provide username and password');
    res.redirect('/auth/login');
    return;
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        // req.flash('login-error', 'username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        // req.flash('login-error', 'username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }

      req.session.currentUser = user;
      res.redirect('/');
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('auth/login');
});

module.exports = router;
