const jwt = require("jsonwebtoken");

const JWT_SECRET = "#Hm12@H}hgma101@741/54{m";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Error verifying the token");

      req.user = null;
    } else {
      req.user = user;

      if (user.role === "admin") {
        req.user.isadm = true;
      }
    }

    next();
  });
};
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("on check user:", req.user);

  if (!token) {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Authentication required",
      })
    );

    return;
  }

  if (!req.user) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Authentication Failed",
      })
    );

    return;
  }

  next();
};

const authorizeSelf = (req, res, next) => {
  if (!req.user || !req.params.id) {
    res.writeHead(500, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Internal server error: Not authenticated",
      })
    );

    return;
  }

  if (req.user.id !== req.params.id) {
    res.writeHead(403, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Forbidden: you can only update your own profile",
      })
    );

    return;
  }

  next();
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.writeHead(403, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Forbidden: only admins can access this endpoint",
      })
    );

    return;
  }

  next();
};

module.exports = {
  authenticateToken,
  authorizeSelf,
  authorizeAdmin,
  checkToken,
};
