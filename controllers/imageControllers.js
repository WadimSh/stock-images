const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { IMAGE_PATH } = require("../utils/constants");
const { imageUrl, maxSize } = require("../utils/imageUtils");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");

const uploadImage = (req, res, next) => {
  const { folder } = req.params;

  if (!req.files || !req.files.image) {
    next(new BadRequest('Изображение не найдено'));
    return;
  }

  const image = req.files.image;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(image.mimetype)) {
    next(new BadRequest('Недопустимый тип файла'));
    return;
  }

  if (image.size > maxSize) {
    next(new BadRequest(`Файл слишком велик (максимальный размер: ${maxSize} байт)`));
    return;
  }

  const filename = `${uuidv4()}-${image.name}`;
  image.mv(path.join(IMAGE_PATH, folder, filename), (err) => {
    if (err) {
      next(new NotFound('Не удалось загрузить изображение'));
      return;
    }
    const url = imageUrl(folder, filename);
    res.status(200).json({ url });
  });
};

const getImage = (req, res) => {
  const { folder, filename } = req.params;
  const parentDir = path.dirname(__dirname);
  const imagePath = path.join(parentDir, IMAGE_PATH, folder, filename);
  
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    throw new NotFound('Изображение не найдено');
  }
};

const deleteImage = (req, res) => {
  const { folder, filename } = req.params;
  const imagePath = path.join(IMAGE_PATH, folder, filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    res.sendStatus(200);
  } else {
    throw new NotFound('Изображение не найдено');
  }
};

const getAllImageUrls = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(IMAGE_PATH, folder);

  fs.promises.readdir(folderPath)
    .then(imageFiles => {
      const imageUrls = imageFiles.map(file => imageUrl(folder, file));
      res.status(200).json({ imageUrls });
    })
    .catch((err) => {
      throw new NotFound('Не удалось получить url');
    })
    .catch(next);
};

module.exports = {
  uploadImage,
  getImage,
  deleteImage,
  getAllImageUrls,
};