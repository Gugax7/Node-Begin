const { z } = require("zod");

const createBookSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  author: z.string().min(1, "Author name cannot be empty."),
  price: z.number().positive("Price must be a positive number."),
  inventory: z.number().nonnegative("Inventory cannot be a negative number."),
  genre: z.string().min(1, "Genre cannot be empty"),
  publicationDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid publication date format. Expected: YYYY-MM-DD",
  }),
  sold: z
    .number()
    .nonnegative(
      "Sold number must be positive, after all, it is impossible to sold something less than 0 times."
    ),
});

const updateBookSchema = createBookSchema.partial().strip();

module.exports = {
  createBookSchema,
  updateBookSchema,
};
