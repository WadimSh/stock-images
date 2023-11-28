const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { imagesPath, maxSize } = require("../utils/imageUtils");

const uploadImage = (req, res) => {
  const { folder } = req.params;

  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "No image found" });
  }

  const image = req.files.image;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(image.mimetype)) {
    return res.status(400).json({ error: "Invalid file type" });
  }

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
};

const getImage = (req, res) => {
  const { folder, filename } = req.params;
  const parentDir = path.dirname(__dirname);
  const imagePath = path.join(parentDir, imagesPath, folder, filename);
  console.log(imagePath)
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
};

const deleteImage = (req, res) => {
  const { folder, filename } = req.params;
  const imagePath = path.join(imagesPath, folder, filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
};

const getAllImageUrls = (req, res) => {
  const { folder } = req.params;
  const folderPath = path.join(imagesPath, folder);

  fs.promises.readdir(folderPath)
    .then(imageFiles => {
      const imageUrls = imageFiles.map(file => `http://localhost:3000/image/${folder}/${file}`);
      res.status(200).json({ imageUrls });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch imageUrls' });
    });
};

module.exports = {
  uploadImage,
  getImage,
  deleteImage,
  getAllImageUrls,
};