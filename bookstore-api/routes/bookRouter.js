const bookController = require("../controllers/bookController");
const {
  authenticateToken,
  authorizeAdmin,
  checkToken,
} = require("../utils/authMiddleware");
const { requestLogger } = require("../utils/loggerMiddleware");
const { parser } = require("../utils/parser");
const {
  createBookSchema,
  updateBookSchema,
} = require("../schemas/bookSchemas");

const bookRoutes = [
  {
    path: "/books",
    method: "GET",
    middleware: [requestLogger, authenticateToken],
    handler: bookController.getAllBooks,
  },
  {
    path: "/books/bestsellers",
    method: "GET",
    middleware: [requestLogger, authenticateToken],
    handler: bookController.getBestSellers,
  },
  {
    path: "/books/:id",
    method: "GET",
    middleware: [requestLogger, authenticateToken],
    handler: bookController.getBookById,
  },
  {
    path: "/books",
    method: "POST",
    middleware: [
      requestLogger,
      authenticateToken,
      checkToken,
      authorizeAdmin,
      parser(createBookSchema),
    ],
    handler: bookController.createBook,
  },
  {
    path: "/books/:id",
    method: "PUT",
    middleware: [
      requestLogger,
      authenticateToken,
      checkToken,
      authorizeAdmin,
      parser(updateBookSchema),
    ],
    handler: bookController.updateBook,
  },
  {
    path: "/books/:id",
    method: "DELETE",
    middleware: [requestLogger, authenticateToken, checkToken, authorizeAdmin],
    handler: bookController.deleteBook,
  },
];

module.exports = bookRoutes;
