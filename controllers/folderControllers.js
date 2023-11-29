const fs = require("fs");
const path = require("path");
const { imagesPath } = require("../utils/imageUtils");

const createFolder = (req, res) => {
  const folderName = req.body.folderName;
  const folderPath = path.join(imagesPath, folderName);

  if (fs.existsSync(folderPath)) {
    res.status(400).json({ message: 'Folder already exists' });
  } else {
    fs.mkdirSync(folderPath);
    res.status(200).json({ message: 'Folder created successfully' });
  }
};

const deleteFolder = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);

  fs.promises.access(folderPath)
    .then(() => {
      return fs.promises.rm(folderPath, { recursive: true });
    })
    .then(() => {
      res.status(200).json({ message: 'Folder deleted successfully' });
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        res.status(404).json({ message: 'Folder does not exist' });
      } 
    })
    .catch(next);
};

const getAllFolders = (req, res, next) => {
  fs.promises.readdir(imagesPath, { withFileTypes: true })
    .then(files => {
      const folders = files
        .filter(file => file.isDirectory())
        .map(file => file.name);
      res.status(200).json({ folders });
    })
    .catch(error => {
      res.status(404).json({ error: "Failed to retrieve folders" });
    })
    .catch(next);
};

module.exports = {
  createFolder,
  deleteFolder,
  getAllFolders,
};