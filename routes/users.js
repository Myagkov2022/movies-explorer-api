const usersRouter = require('express').Router();
const { updateUserValidate } = require('../middlewares/validate');

const { getUser, updateUser } = require('../controllers/users');

usersRouter.get('/me', getUser);

usersRouter.patch('/me', updateUserValidate, updateUser);

module.exports = usersRouter;
