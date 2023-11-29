const path = require("path");

const { imagesPath } = require("../utils/imageUtils");
const { findByName } = require("../utils/searchUtils");
const NotFound = require("../errors/NotFound");

const searchImages = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);
  const query = req.query.files;
  findByName(folderPath, query)
    .then((files) => {
      if (files && files.length > 0) {
        res.send(files);
      } else {
        throw new NotFound('Файл не найден');
      }
    })
    .catch(next);
};

module.exports = {
  searchImages,
};