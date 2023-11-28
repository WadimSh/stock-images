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
const maxSize = 1 * 1024 * 1024; // Максимальный размер файла (в данном случае 1MB)

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
    return res.status(400).json({ error: `File is too large (max size: ${maxSize} bytes)` });
  }
  const filename = `${uuidv4()}-${image.name}`;
  image.mv(path.join(imagesPath, folder, filename), (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to upload image" });
    }
    res.json({ folder, filename });
  });
});

// Получение изображения по имени файла
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
app.get('/images/:folder',  (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);
  fs.promises.readdir(folderPath)
    .then(imageFiles => {
      const imageUrls = imageFiles.map(file => `localhost:3000/image/${folder}/${file}`);
      res.status(200).json({ imageUrls });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch imageUrls' });
    });
});


//поск файла изображения, отдает массив названий файлов в которых есть совпадения
app.get('/:folder/search', (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);
    const query = req.query.files;
    findByName(folderPath, query)
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
  const folderPath = path.join(imagesPath, folderName);
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
  const folderPath = path.join(imagesPath, folder);
  fs.promises.access(folderPath)
  .then(() => {
    // Рекурсивно удаляем папку и все ее содержимое
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
});

// Маршрут для получения списка папок, где хранятся изображения
app.get('/folders', (req, res) => {
  const folders = fs.readdirSync(imagesPath, { withFileTypes: true })
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