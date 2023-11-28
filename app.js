const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const { readdir } = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(fileUpload());
app.use(express.json());

const imagesPath = path.join(__dirname, "images"); // Путь к папке images
const maxSize = 5 * 1024 * 1024; // Максимальный размер файла (в данном случае 5MB)

// Создаем папку images, если она не существует
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath);
}

//функция поиска
const findByName = async (dir, name) => {
  const matchedFiles = [];
  const files = await readdir(dir);
  for (const file of files) {
    if (file.includes(name)) {
      matchedFiles.push(file);
    }
  }
  return matchedFiles;
};

// Обработчик загрузки изображений
app.post("/upload/:folder", (req, res) => {
  const { folder } = req.params;
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No image found" });
  }

  const image = req.files.image;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  // Проверка типа файла
  if (!allowedTypes.includes(image.mimetype)) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  // Проверка размера файла
  if (image.size > maxSize) {
    return res
      .status(400)
      .json({ error: `File is too large (max size: ${maxSize} bytes)` });
  }

  const filename = `${uuidv4()}-${image.name}`;

  image.mv(path.join(imagesPath, folder, filename), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    res.json({ filename });
  });
});

// Получение ссылки на изображение по имени файла
app.get("/image/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const imagePath = path.join(imagesPath, folder, filename);

  // Проверка существования изображения
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
});

// Удаление изображения по имени файла
app.delete("/image/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const imagePath = path.join(imagesPath, folder, filename);

  // Проверка существования изображения
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
});

// Маршрут для получения массива ссылок на все хранящиеся изображения
app.get('/images/:folder',  async (req, res) => {
  try {
  const { folder } = req.params;  
  const imageFiles = await fs.promises.readdir(`./images/${folder}`);
  const imageUrls = imageFiles.map(file => `http://localhost:3000/images/${folder}/${file}`);
  res.status(200).json({ imageUrls });
  } catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Failed to fetch imageUrls' });
  }
});

//поск файла изображения, отдает массив названий файлов в которых есть совпадения
app.get('/:folder/search', (req, res) => {
  const { folder } = req.params;
    const query = req.query.files;
    findByName(`./images/${folder}`, query)
    .then((files) => {
      if (files && files.length > 0) {
        res.send(files);
      } else {
        res.status(404).send("File not found.");
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    })
});

// Маршрут для создания новой папки для хранения изображений
app.post('/create-folder', (req, res) => {
  const folderName = req.body.folderName;
  const folderPath = `./images/${folderName}`;
  if (fs.existsSync(folderPath)) {
    res.status(400).json({ message: 'Folder already exists' });
  } else {
    fs.mkdirSync(folderPath);
    res.status(200).json({ message: 'Folder created successfully' });
  }
});

// Маршрут для удаления папки для хранения изображений
app.delete("/:folder", (req, res) => {
  const { folder } = req.params;
  const folderPath = `./images/${folder}`;

try {
  // Проверяем существует ли папка перед удалением
  if (fs.existsSync(folderPath)) {
    // Рекурсивно удаляем папку и все ее содержимое
    fs.rmdirSync(folderPath, { recursive: true });
    res.status(200).json({ message: 'Folder deleted successfully' });
  } else {
    res.status(404).json({ message: 'Folder does not exist' });
  }
} catch (err) {
  res.status(500).json({ message: 'Error deleting folder' });
}
});

// Маршрут для получения списка папок, где хранятся изображения
app.get('/folders', (req, res) => {
  const folderPath = path.join(__dirname, 'images');
  const folders = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  res.status(200).json({ folders });
});

//возвращает форму загрузки изображений
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Server running on port 3000");
});