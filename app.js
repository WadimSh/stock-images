require('dotenv').config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

//под временную функциональность для разработки
const path = require("path");

const rateLimiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(requestLogger);

app.use(rateLimiter);

app.use(helmet());

app.use(fileUpload());

app.use(express.json());

//возвращает форму загрузки изображений (временная функциональность для разработки)
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);