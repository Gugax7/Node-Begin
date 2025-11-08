const { z } = require("zod");

const orderItemSchema = z.object({
  id: z
    .string()
    .min(3, "Id must have at least 3 numbers")
    .max(10, "Id cannot exceed 10 numbers"),
  quantity: z
    .number()
    .int()
    .max(100, "Only special orders can ask for 100+ items of same id")
    .optional(),
});

module.exports = {
  orderItemSchema,
};
