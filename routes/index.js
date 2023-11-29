const router = require('express').Router();
const auth = require('../middlewares/auth');
const folderRouter = require('./folderRouters');
const imageRouter = require('./imageRouters');
const searchRouter = require('./searchRouters');

router.use('/image', imageRouter);

router.use('/search', searchRouter);

router.use('/folder', auth, folderRouter);

router.use('*', auth, (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;