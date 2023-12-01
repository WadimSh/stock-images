const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { IMAGE_PATH } = require("./constants");

// Функция генерации уникального имени папки
const generateFolder = () => {
  const folderName = uuidv4();
  const folderPath = path.join(IMAGE_PATH, folderName);
  
  while (fs.existsSync(folderPath)) {
    folderName = uuidv4();
    folderPath = path.join(IMAGE_PATH, folderName);
  }
  
  return folderName;
};

module.exports = {
  generateFolder,
};