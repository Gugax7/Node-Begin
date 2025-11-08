const sendJsonResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
};

module.exports = {
  sendJsonResponse,
};
