const orderController = require("../controllers/orderController");
const { requestLogger } = require("../utils/loggerMiddleware");
const {
  authenticateToken,
  authorizeSelf,
  authorizeAdmin,
  checkToken,
} = require("../utils/authMiddleware");
const { orderItemSchema } = require("../schemas/orderSchemas");
const { parser } = require("../utils/parser");

const orderRoutes = [
  {
    // this i need to put only admin auth...
    path: "/orders/cart",
    method: "GET",
    middleware: [requestLogger, authenticateToken, checkToken],
    handler: orderController.getUserCart,
  },
  {
    path: "/orders",
    method: "GET",
    middleware: [requestLogger, authenticateToken, checkToken],
    handler: orderController.getAllOrders,
  },
  {
    path: "/orders",
    method: "POST",
    middleware: [requestLogger, authenticateToken, checkToken],
    handler: orderController.createOrder,
  },
  {
    path: "/orders/addtocart",
    method: "POST",
    middleware: [
      requestLogger,
      authenticateToken,
      checkToken,
      parser(orderItemSchema),
    ],
    handler: orderController.addToCart,
  },
  {
    path: "/orders/finishorder",
    method: "POST",
    middleware: [requestLogger, authenticateToken, checkToken],
    handler: orderController.finishOrder,
  },
];

module.exports = { orderRoutes };
