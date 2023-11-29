const rateLimit = require('express-rate-limit');

//middleware ограничивает количество запросов, которые могут быть сделаны на сервер за определенный период времени
//в данном случае определено 500 запросов за 15 минут
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

module.exports = rateLimiter;