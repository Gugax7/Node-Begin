const { orders, books, carts, OrderStatus } = require("../data");
const orderService = require("../services/orderService");
const { sendJsonResponse } = require("../utils/responders");
const { handleServiceError } = require("../errors/errorHandler");

const getAllOrders = (req, res) => {
  sendJsonResponse(res, 200, {
    success: true,
    orders,
  });
};

const getUserCart = (req, res) => {
  try {
    const cart = orderService.getCart(req.user.id);

    sendJsonResponse(res, 200, {
      success: true,
      cart,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const addToCart = (req, res) => {
  try {
    const orderItem = orderService.addToCart(req.user.id, req.parsedBody);

    sendJsonResponse(res, 200, {
      success: true,
      message: "Item added successfully",
      orderItem,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const finishOrder = (req, res) => {
  try {
    const order = orderService.makeOrder(req.user.id);

    sendJsonResponse(res, 200, {
      success: true,
      order,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

module.exports = {
  getAllOrders,
  addToCart,
  getUserCart,
  finishOrder,
};
