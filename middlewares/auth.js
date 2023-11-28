const payload = "thisismysecrctekeyfhrgfgrfrty84fwir767";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Invalid authorization" });
  }

  const token = authorization.replace('Bearer ', '');

  if (token === payload) {
    next();
  } else {
    return res.status(401).json({ error: "Invalid authorization" });
  }
};