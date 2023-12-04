const fs = require("fs");

const { IMAGE_PATH, BASE_URL } = require("./constants");

// Формируем ссылку на файл изображения
const imageUrl = (folder, filename) => {
  return `${BASE_URL}/${folder}/${filename}`;
};

// Максимальный размер файла (в данном случае 1MB)
const maxSize = 1 * 1024 * 1024;

// Создаем папку images, если она не существует
if (!fs.existsSync(IMAGE_PATH)) {
  fs.mkdirSync(IMAGE_PATH);
};

module.exports = {
  imageUrl,
  maxSize,
};