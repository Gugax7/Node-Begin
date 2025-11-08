const { books } = require("../data");
const { ConflictError, NotFoundError } = require("../errors/errors");

const getAllBooks = (user) => {
  if (user) {
    if (user.isadm) {
      return books;
    }
  }

  const userBooks = [];

  books.forEach((book) => {
    const { inventory, sold, ...userBook } = book;
    userBooks.push(userBook);
  });

  return userBooks;
};

const findBookById = (id) => {
  const book = books.find((book) => book.id === id);

  if (!book) {
    throw new NotFoundError("Book not Found.");
  }

  return book;
};

const createBook = (bookData) => {
  const { title } = bookData;

  if (books.some((book) => book.title === title)) {
    throw new ConflictError("There is already a book with this title");
  }

  let id;

  do {
    id = Math.round(Math.random() * 10000000).toString();
  } while (books.some((book) => book.id === id));

  const newBook = { ...bookData, id: id };

  books.push(newBook);

  return newBook;
};

const updateBook = (id, updates) => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    throw new NotFoundError(`Book with ID ${id} not found`);
  }

  if (updates.title) {
    if (
      books.some(
        (book) => book.title.toLowerCase() === updates.title.toLowerCase()
      ) &&
      updates.title.toLowerCase() !== books[bookIndex].title.toLowerCase()
    ) {
      throw new ConflictError("There is already a book with this title");
    }
  }

  const updatedBook = { ...books[bookIndex], ...updates, id: id };

  books[bookIndex] = updatedBook;

  return updatedBook;
};

const deleteBook = (id) => {
  const initialLength = books.length;
  const filteredBooks = books.filter((book) => book.id !== id);

  if (initialLength === filteredBooks.length) {
    throw new NotFoundError("There is no book with this id");
  }

  books.splice(0, initialLength, ...filteredBooks);

  return { message: "Book deleted succesffuly." };
};

const searchBooks = (query, user) => {
  const { search, title, author, genre, publicationYear, minPrice, maxPrice } =
    query;
  let filteredBooks = [...books];

  if (search) {
    const searchTerm = search.toLowerCase();

    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publicationDate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (title) {
    const titleTerm = title.toLowerCase();

    filteredBooks = filteredBooks.filter((book) => {
      book.title.toLowerCase().includes(titleTerm.toLowerCase());
    });
  }

  if (author) {
    const authorTerm = author.toLowerCase();

    filteredBooks = filteredBooks.filter((book) => {
      book.author.toLowerCase().includes(authorTerm.toLowerCase());
    });
  }

  if (genre) {
    const genreTerm = genre.toLowerCase();

    filteredBooks = filteredBooks.filter((book) => {
      book.genre.toLowerCase().includes(genreTerm.toLowerCase());
    });
  }

  if (publicationYear) {
    const year = parseInt(publicationYear, 10);

    if (!isNaN(year)) {
      filteredBooks = filteredBooks.filter(
        (book) => new Date(book.publicationDate).getFullYear === year
      );
    }
  }

  if (minPrice) {
    const minP = parseFloat(minPrice);

    if (!isNaN(minP)) {
      filteredBooks = filteredBooks.filter((book) => book.price >= minP);
    }
  }

  if (maxPrice) {
    const maxP = parseFloat(maxPrice);

    if (!isNaN(maxP)) {
      filteredBooks = filteredBooks.filter((book) => book.price <= maxP);
    }
  }

  console.log(user);

  if (user) {
    if (user.isadm) {
      return filteredBooks;
    }
  }
  const filteredUserBooks = [];

  filteredBooks.forEach((book) => {
    const { sold, inventory, ...userBook } = book;
    filteredUserBooks.push(userBook);
  });

  return filteredUserBooks;
};

const getBestSellers = () => {
  const sortedBooks = [...books].sort(
    (book1, book2) => book2.sold - book1.sold
  );
  return sortedBooks.slice(0, 10);
};

module.exports = {
  findBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getBestSellers,
  getAllBooks,
};
