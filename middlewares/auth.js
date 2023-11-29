const Unauthorized = require("../errors/Unauthorized");
const { TOKEN } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Недействительная авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  if (token === TOKEN) {
    next();
  } else {
    next(new Unauthorized('Недействительная авторизация'));
    return;
  }
};