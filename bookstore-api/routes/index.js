const bookRoutes = require("./bookRouter");
const { userRoutes } = require("./userRouter");
const { orderRoutes } = require("./orderRouter");

module.exports = [...bookRoutes, ...userRoutes, ...orderRoutes];
