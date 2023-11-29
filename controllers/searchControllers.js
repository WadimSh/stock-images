const path = require("path");

const { IMAGE_PATH } = require("../utils/constants");
const { findByName } = require("../utils/searchUtils");
const NotFound = require("../errors/NotFound");

const searchImages = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(IMAGE_PATH, folder);
  const query = req.query.files;
  
  findByName(folderPath, query)
    .then((files) => {
      if (files && files.length > 0) {
        const searchFiles = files.map(file => `http://localhost:3000/image/${folder}/${file}`);
        res.status(200).json({ searchFiles });
      } else {
        throw new NotFound('Файл не найден');
      }
    })
    .catch(next);
};

module.exports = {
  searchImages,
};