const express = require('express');
const multer = require('multer');
const path = require('path');
const Joi = require('joi');

const app = express();

// Настройка Multer для сохранения изображений
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Схема для валидации файла
const fileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png', 'image/gif').required(),
  size: Joi.number().max(1000000).required(),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
});

// Функция валидации размера и типа файла
const fileFilter = (req, file, cb) => {
  const validationResult = fileSchema.validate(file);

  if (validationResult.error) {
    cb(validationResult.error.message);
  } else {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb('Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.');
    }
  }
};

// Инициализация Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Максимальный размер файла: 1MB
  fileFilter: (req, file, cb) => {
    fileFilter(req, file, cb);
  }
}).single('image');

// Маршрут для загрузки изображений
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;//Формирование ссылки
      res.status(200).json({ imageUrl });
    }
  });
});

// Статический роутинг для доступа к загруженным изображениям
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});