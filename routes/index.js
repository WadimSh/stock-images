const router = require('express').Router();

const auth = require('../middlewares/auth');
const folderRouter = require('./folderRouters');
const imageRouter = require('./imageRouters');
const searchRouter = require('./searchRouters');
const NotFound = require('../errors/NotFound');

router.use('/image', imageRouter);

router.use('/search', searchRouter);

router.use('/folder', auth, folderRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFound('Страница с таким url не найдена'));
});

module.exports = router;