const { users } = require("../data");
const userService = require("../services/userService");
const { handleServiceError } = require("../errors/errorHandler");
const { sendJsonResponse } = require("../utils/responders");

const getAllUsers = (req, res) => {
  sendJsonResponse(res, 200, users);
};

const getUserById = (req, res) => {
  try {
    const user = userService.findUserById(req.params.id);
    sendJsonResponse(res, 200, {
      success: true,
      user,
    });
  } catch (error) {
    handleServiceError(res, err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.parsedBody);

    sendJsonResponse(res, 201, {
      success: true,
      user: newUser,
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.parsedBody
    );

    sendJsonResponse(res, 200, {
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    handleServiceError(res, err);
  }
};

const deleteUser = (req, res) => {
  try {
    userService.deleteUser(req.params.id);

    sendJsonResponse(res, 200, {
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    handleServiceError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(req.parsedBody);

    sendJsonResponse(res, 200, {
      success: true,
      message: "Login successful.",
      token,
      user,
    });
  } catch (err) {
    handleServiceError(res, err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
