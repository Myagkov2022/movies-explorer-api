const http2 = require('node:http2');
const mongoose = require('mongoose');
const { ConflictError, NotFoundError, ValidationError } = require('../errors');
const User = require('../models/user');

const getUser = (req, res, next) => {
  User.findById(req.user._id).then((user) => res.status(http2.constants.HTTP_STATUS_OK).send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  updateUser,
};
