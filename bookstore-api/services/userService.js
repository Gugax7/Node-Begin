const { users } = require("../data");
const {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
} = require("../schemas/userSchemas");
const {
  ConflictError,
  ValidationError,
  NotFoundError,
} = require("../errors/errors");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const JWT_SECRET = "#Hm12@H}hgma101@741/54{m";
const JWT_EXPIRATION_TIME = "1h";

const findUserById = (id) => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new NotFoundError(`User with id: ${id} not found!`);
  }

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  if (
    users.some((user) => user.email.toLowerCase() === email.toLowerCase())
  ) {
    throw new ConflictError("This email was already registered.");
  }

  let id;

  do {
    id = Math.round(Math.random() * 100000000).toString();
  } while (users.some((user) => user.id === id));

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    id,
    name,
    email,
    password: hashedPassword,
    role: role || "customer",
  };

  users.push(newUser);

  const { password: _, ...userResponse } = newUser;

  return userResponse;
};

const updateUser = async (id, updates) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    throw new NotFoundError(`User with ID ${id} not found`);
  }

  if (
    updates.email &&
    updates.email.toLowerCase() !== users[userIndex].email.toLowerCase()
  ) {
    if (
      users.some(
        (user) => user.email.toLowerCase() === updates.email.toLowerCase()
      )
    ) {
      throw new ConflictError("Another user with this email already exists");
    }
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
  }

  const updatedUser = { ...users[userIndex], ...updates, id: id };
  users[userIndex] = updatedUser;

  const { password: _, ...userResponse } = updatedUser;

  return userResponse;
};

const deleteUser = (id) => {
  const initialLength = users.length;
  const filteredUsers = users.filter((user) => user.id !== id);

  if (initialLength === filteredUsers.length) {
    throw new NotFoundError("There is no user with this id");
  }

  users.splice(0, initialLength, ...filteredUsers);
  return { message: "User deleted successfully" };
};

const loginUser = async (userCredentials) => {
  try {
    const validatedCredentials = loginUserSchema.parse(userCredentials);
    const { email, password } = validatedCredentials;

    const user = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      throw new NotFoundError("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new NotFoundError("Invalid Credentials");
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });

    const { password: _, ...userResponse } = user;

    return { token, user: userResponse };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        "Validation failed for login user credentials",
        error.issues
      );
    }

    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new Error(`Failed to login: ${error.message}`);
  }
};
module.exports = {
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
