const { sendJsonResponse } = require("./responders");

const parser = (schema) => {
  return (req, res, next) => {
    parseRequestBody(req, (err, info) => {
      if (err) throw err;
      
      try {
        req.parsedBody = schema.parse(info);
      } catch (error) {
        sendJsonResponse(res, 400, {
          success: false,
          message: error.issues,
        });
      }

      next();
    });
  };
};

const parseRequestBody = (req, callback) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    console.log(body);
    try {
      const parsedBody = body ? JSON.parse(body) : {};
      callback(null, parsedBody);
    } catch (error) {
      callback(error, null);
    }
  });
};

module.exports = {
  parser,
};
