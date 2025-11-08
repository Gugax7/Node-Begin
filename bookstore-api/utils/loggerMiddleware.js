const requestLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(
    `[${timeStamp}] ${req.method} -> ${req.url} - IP: ${req.socket.remoteAdress}`
  );

  next();
};

module.exports = {
  requestLogger,
};
