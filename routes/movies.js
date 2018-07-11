var express = require('express');
var router = express.Router();

const Movie = require('../models/movie.js');

router.get('/', (res, req, next) => {
  Movie.find()
    .then(allMovies => {
      res.render('movies', {allMovies: allMovies});
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
