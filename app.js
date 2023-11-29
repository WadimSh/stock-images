const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const router = require('./routes/index');
const { PORT = 3000 } = process.env;
const app = express();

app.use(fileUpload());
app.use(express.json());

//возвращает форму загрузки изображений (временная функциональность)
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(router);

app.listen(PORT);