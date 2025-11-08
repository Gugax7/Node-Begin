const bookController = require("./bookController");
const orderController = require("./orderController");
const userController = require("./userController");

module.exports = { ...bookController, ...orderController, ...userController };
