const fs = require("fs");
const path = require("path");

const { IMAGE_PATH } = require("../utils/constants");
const { imageUrl, maxSize } = require("../utils/imageUtils");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");

// Контроллер загрузки файла на сервер в указанную в url папку
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

  const imagePath = path.join(IMAGE_PATH, folder, image.name);
  if (fs.existsSync(imagePath)) {
    next(new BadRequest('Файл с таким именем уже существует'));
    return;
  }

  image.mv(imagePath, (err) => {
    if (err) {
      next(new NotFound('Не удалось загрузить изображение'));
      return;
    }
    const url = imageUrl(folder, image.name);
    res.status(200).json({ url, size: image.size, name: image.name });
  });
};

// Контроллер возращает указанный в url файл
const getImage = (req, res) => {
  const { folder, filename } = req.params;
  const parentDir = path.dirname(__dirname);
  const imagePath = path.join(parentDir, IMAGE_PATH, folder, filename);
  
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const options = {
      headers: {
        'Content-Length': stats.size,
        'Content-Disposition': `inline; filename=${filename}`,
      },
    };
    res.sendFile(imagePath, options);
  } else {
    throw new NotFound('Изображение не найдено');
  }
};

// Контроллер удаляет указанный в url файл из папки
const deleteImage = (req, res) => {
  const { folder, filename } = req.params;
  const imagePath = path.join(IMAGE_PATH, folder, filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    res.status(200).json({ message: `Файл ${filename} успешно удален` });
  } else {
    throw new NotFound('Изображение не найдено');
  }
};

// Контроллер возвращает массив данных о всех файлах хранящихся в указанной в url папке
const getAllImageUrls = (req, res, next) => {
  const { folder } = req.params;
  const folderPath = path.join(IMAGE_PATH, folder);

  fs.promises.readdir(folderPath)
    .then(imageFiles => {
      const imageInfoPromises = imageFiles.map((file) => {
        const filePath = path.join(folderPath, file);
        return fs.promises.stat(filePath).then((stats) => ({
          url: imageUrl(folder, file),
          size: stats.size,
          name: file,
        }));
      });
      return Promise.all(imageInfoPromises);
    })
    .then(imageInfos => {
      res.status(200).json({ imageInfos });
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