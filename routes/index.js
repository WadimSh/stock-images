const router = require('express').Router();
const folderRouter = require('./folderRouters');
const imageRouter = require('./imageRouters');
const searchRouter = require('./searchRouters');

router.use('/image', imageRouter);

router.use('/search', searchRouter);

router.use('/folder', folderRouter);

module.exports = router;