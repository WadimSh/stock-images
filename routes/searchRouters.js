const searchRouter = require('express').Router();
const searchController = require("../controllers/searchControllers");

searchRouter.get("/:folder", searchController.searchImages);

module.exports = searchRouter;