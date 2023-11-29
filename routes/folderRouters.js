const folderRouter = require('express').Router();

const folderController = require("../controllers/folderControllers");

folderRouter.post("/", folderController.createFolder);
folderRouter.delete("/:folder", folderController.deleteFolder);
folderRouter.get("/", folderController.getAllFolders);

module.exports = folderRouter;