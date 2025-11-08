const bookService = require("./bookService");
const userService = require("./userService");
const orderService = require("./orderService");

module.exports = { ...bookService, ...userService, ...orderService };
