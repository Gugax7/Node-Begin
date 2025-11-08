const { books } = require("../data");
const { sendJsonResponse } = require("../utils/responders");
const bookService = require("../services/bookService");
const { handleServiceError } = require("../errors/errorHandler");

const getAllBooks = (req, res) => {
  // ##TODO: if admin you can see how many books left

  if (Object.keys(req.query).length > 0) {
    searchBooks(req, res);

    return;
  }

  sendJsonResponse(res, 200, {
    success: true,
    books: bookService.getAllBooks(req.user),
  });
};

const getBookById = (req, res) => {
  try {
    const book = bookService.findBookById(req.params.id);

    sendJsonResponse(res, 200, {
      success: true,
      book,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const createBook = (req, res) => {
  try {
    const book = bookService.createBook(req.parsedBody);

    sendJsonResponse(res, 200, {
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = bookService.updateBook(req.params.id, req.parsedBody);

    sendJsonResponse(res, 200, {
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};
// ##TODO - deleteBook

const deleteBook = (req, res) => {
  try {
    bookService.deleteBook(req.params.id);

    sendJsonResponse(res, 200, {
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const searchBooks = (req, res) => {
  //console.log(req.query);

  const filteredBooks = bookService.searchBooks(req.query, req.user);

  if (!filteredBooks) {
    sendJsonResponse(res, 500, {
      success: false,
      message: "Some unexpected error occured",
    });

    return;
  }

  sendJsonResponse(res, 200, {
    success: true,
    filteredBooks,
  });
};

const getBestSellers = (req, res) => {
  sendJsonResponse(res, 200, {
    success: true,
    bestSellers: bookService.getBestSellers(),
  });
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBestSellers,
};
