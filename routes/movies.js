const moviesRouter = require('express').Router();
const { createMovieValidate, deleteMovieValidate } = require('../middlewares/validate');

const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidate, createMovies);
moviesRouter.delete('/:id', deleteMovieValidate, deleteMovies);

module.exports = moviesRouter;
