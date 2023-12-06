const jwt = require('jsonwebtoken');

const Unauthorized = require("../errors/Unauthorized");
const Forbidden = require("../errors/Forbidden");
const { SECRET_KEY, ROLE } = process.env;

// Модуль авторизации
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Недействительная авторизация'));
    return;
  }
  //superadmin = c4cbbc48eee69525238ce432094bab4eaab253abd78cac18268da5a83bf2c435
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzAxODQ2MzI3fQ.fIzz3EBebFMYMxK5PvUzirzRw8P80mGfPB9XD4qgWDQ
  const token = authorization.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== ROLE) {
      throw new Forbidden('Не достаточно прав для использования данной функции');
    }
    next();
    return true;
  } catch (err) {
    next(new Unauthorized('Недействительная авторизация'));
  }
};