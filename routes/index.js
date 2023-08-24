const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/auth');
const { NotFoundError } = require('../errors');

router.use('/users', auth, userRouter);

router.use('/movies', auth, moviesRouter);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
module.exports = router;
