const { ValidationError, ConflictError, NotFoundError } = require("./errors");
const { sendJsonResponse } = require("../utils/responders");

const handleServiceError = (res, err) => {
  if (err instanceof ValidationError) {
    sendJsonResponse(res, err.statusCode, {
      success: false,
      message: err.message,
      issues: err.issues,
    });

    return;
  }

  if (err instanceof ConflictError || err instanceof NotFoundError) {
    sendJsonResponse(res, err.statusCode, {
      success: false,
      message: err.message,
    });

    return;
  }

  console.error("Unexpected error in controller: " + err);

  sendJsonResponse(res, 500, {
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = {
  handleServiceError,
};
