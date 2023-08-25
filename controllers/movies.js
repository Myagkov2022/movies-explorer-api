const http2 = require('node:http2');
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError, ValidationError } = require('../errors');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner }).then((movies) => res.status(http2.constants.HTTP_STATUS_OK).send(movies))
    .catch(next);
};

const createMovies = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(http2.constants.HTTP_STATUS_CREATED).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные добавлении карточки.'));
      } else {
        next(error);
      }
    });
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      return Movie.deleteOne({ _id: req.params.id })
        .then(() => res.status(http2.constants.HTTP_STATUS_OK).send(movie));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Не корректный id '));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovies, deleteMovies };
