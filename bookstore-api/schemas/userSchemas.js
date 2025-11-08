const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password cant exceed 100 characters"),
  role: z.enum(["customer", "admin"]).default("customer").optional(),
});

const loginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required for login."),
});

const updateUserSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(100, "Password cant exceed 100 characters"),
    role: z.enum(["customer", "admin"]).default("customer").optional(),
  })
  .partial()
  .strip();

module.exports = {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
};
