require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/rateLimiter');
const { PORT, DB_ADDRESS } = require('./utils/config');

const app = express();
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.listen(PORT, () => {
  console.log(`Server is listening ${PORT} port`);
});
