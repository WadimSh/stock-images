const Unauthorized = require("../errors/Unauthorized");

const payload = "thisismysecrctekeyfhrgfgrfrty84fwir767";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Недействительная авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  if (token === payload) {
    next();
  } else {
    next(new Unauthorized('Недействительная авторизация'));
    return;
  }
};