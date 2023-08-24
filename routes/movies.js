const { celebrate, Joi } = require('celebrate');
const moviesRouter = require('express').Router();
const validateURL = require('../middlewares/validateURL');

const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL, 'url validation'),
    trailerLink: Joi.string().required().custom(validateURL, 'url validation'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().email(),
    movieId: Joi.number().required(),
  }),
}), createMovies);
moviesRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteMovies);

module.exports = moviesRouter;
