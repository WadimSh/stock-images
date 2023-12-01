const fs = require("fs");
const path = require("path");

const { IMAGE_PATH } = require("../utils/constants");
const { imageUrl } = require("../utils/imageUtils");
const { findByName } = require("../utils/searchUtils");
const NotFound = require("../errors/NotFound");

const searchImages = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(IMAGE_PATH, folder);
  const query = req.query.files;
  
  findByName(folderPath, query)
    .then((files) => {
      if (files && files.length > 0) {
        const searchFilesPromises = files.map(file => {
          const filePath = path.join(folderPath, file);

          return fs.promises.stat(filePath).then((stats) => ({
            url: imageUrl(folder, file),
            size: stats.size,
            name: file,
          }));
        });

        return Promise.all(searchFilesPromises);
      } else {
        throw new NotFound('Файл не найден');
      }
    })
    .then((searchFiles) => {
      res.status(200).json({ searchFiles });
    })
    .catch(next);
};

module.exports = {
  searchImages,
};