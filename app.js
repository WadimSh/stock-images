const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const router = require('./routes/index');

const app = express();

app.use(fileUpload());
app.use(express.json());

app.use(router);


//возвращает форму загрузки изображений
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Server running on port 3000");
});