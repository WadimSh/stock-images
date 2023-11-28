const fs = require("fs");

//Функция поиска файла
const findByName = async (dir, name) => {
  const matchedFiles = [];
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    if (file.includes(name)) {
      matchedFiles.push(file);
    }
  }
  return matchedFiles;
};

module.exports = {
  findByName,
};