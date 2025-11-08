const userController = require("../controllers/userController");
const {
  authenticateToken,
  authorizeSelf,
  checkToken,
  authorizeAdmin,
} = require("../utils/authMiddleware");
const { requestLogger } = require("../utils/loggerMiddleware");
const {
  loginUserSchema,
  createUserSchema,
  updateUserSchema,
} = require("../schemas/userSchemas");
const { parser } = require("../utils/parser");

const userRoutes = [
  {
    path: "/login",
    method: "POST",
    middleware: [requestLogger, parser(loginUserSchema)],
    handler: userController.loginUser,
  },
  {
    path: "/users",
    method: "POST",
    middleware: [requestLogger, parser(createUserSchema)],
    handler: userController.createUser,
  },
  {
    path: "/users",
    method: "GET",
    middleware: [requestLogger, authenticateToken, checkToken, authorizeAdmin],
    handler: userController.getAllUsers,
  },
  {
    path: "/users/:id",
    method: "GET",
    middleware: [requestLogger, authenticateToken, checkToken, authorizeSelf],
    handler: userController.getUserById,
  },

  // protected routes
  {
    path: "/users/:id",
    method: "PUT",
    middleware: [
      requestLogger,
      authenticateToken,
      checkToken,
      authorizeSelf,
      parser(updateUserSchema),
    ],
    handler: userController.updateUser,
  },
  {
    path: "/users/:id",
    method: "DELETE",
    middleware: [requestLogger, authenticateToken, checkToken, authorizeSelf],
    handler: userController.deleteUser,
  },
];

module.exports = { userRoutes };
