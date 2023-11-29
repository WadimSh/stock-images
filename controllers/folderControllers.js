const fs = require("fs");
const path = require("path");

const { IMAGE_PATH } = require("../utils/constants");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");

const createFolder = (req, res) => {
  const folderName = req.body.folderName;
  const folderPath = path.join(IMAGE_PATH, folderName);

  if (fs.existsSync(folderPath)) {
    throw new BadRequest('Папка уже существует');
  } else {
    fs.mkdirSync(folderPath);
    res.status(200).json({ message: 'Папка успешно создана' });
  }
};

const deleteFolder = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(IMAGE_PATH, folder);

  fs.promises.access(folderPath)
    .then(() => {
      return fs.promises.rm(folderPath, { recursive: true });
    })
    .then(() => {
      res.status(200).json({ message: 'Папка успешно удалена' });
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        throw new NotFound('Папка не существует');
      } 
    })
    .catch(next);
};

const getAllFolders = (req, res, next) => {
  fs.promises.readdir(IMAGE_PATH, { withFileTypes: true })
    .then(files => {
      const folders = files
        .filter(file => file.isDirectory())
        .map(file => file.name);
      res.status(200).json({ folders });
    })
    .catch((err) => {
      throw new NotFound('Не удалось получить папки');
    })
    .catch(next);
};

module.exports = {
  createFolder,
  deleteFolder,
  getAllFolders,
};