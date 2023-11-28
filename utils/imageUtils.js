const fs = require("fs");
const path = require("path");

// Путь к папке images
const imagesPath = "./images";

// Максимальный размер файла (в данном случае 1MB)
const maxSize = 1 * 1024 * 1024;

// Создаем папку images, если она не существует
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath);
}

module.exports = {
  imagesPath,
  maxSize,
};