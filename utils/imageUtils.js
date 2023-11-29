const fs = require("fs");
const path = require("path");

const { IMAGE_PATH } = require("./constants");

// Максимальный размер файла (в данном случае 1MB)
const maxSize = 1 * 1024 * 1024;

// Создаем папку images, если она не существует
if (!fs.existsSync(IMAGE_PATH)) {
  fs.mkdirSync(IMAGE_PATH);
}

module.exports = {
  maxSize,
};