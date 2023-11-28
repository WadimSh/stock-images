const imageRouter = require('express').Router();
const imageController = require("../controllers/imageControllers");

imageRouter.post("/:folder", imageController.uploadImage);
imageRouter.get("/:folder/:filename", imageController.getImage);
imageRouter.delete("/:folder/:filename", imageController.deleteImage);
imageRouter.get("/:folder", imageController.getAllImageUrls);

module.exports = imageRouter