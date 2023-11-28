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

const deleteFolder = (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);

  fs.promises.access(folderPath)
    .then(() => {
      return fs.promises.rmdir(folderPath, { recursive: true });
    })
    .then(() => {
      res.status(200).json({ message: 'Folder deleted successfully' });
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        res.status(404).json({ message: 'Folder does not exist' });
      } else {
        res.status(500).json({ message: 'Error deleting folder' });
      }
    });
};

const getAllFolders = (req, res) => {
  const folders = fs.readdirSync(imagesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  res.status(200).json({ folders });
};

module.exports = {
  createFolder,
  deleteFolder,
  getAllFolders,
};