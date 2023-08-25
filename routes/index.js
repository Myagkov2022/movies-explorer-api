const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/auth');
const { NotFoundError } = require('../errors');
const { signinValidate, signupValidate } = require('../middlewares/validate');

router.use('/users', auth, userRouter);

router.use('/movies', auth, moviesRouter);

router.post('/signin', signinValidate, login);

router.post('/signup', signupValidate, createUser);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});
module.exports = router;
