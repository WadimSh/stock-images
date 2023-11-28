const path = require("path");
const { imagesPath } = require("../utils/imageUtils");
const { findByName } = require("../utils/searchUtils");

const searchImages = (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);
  const query = req.query.files;
  findByName(folderPath, query)
    .then((files) => {
      if (files && files.length > 0) {
        res.send(files);
      } else {
        res.status(404).send("File not found.");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
};

module.exports = {
  searchImages,
};