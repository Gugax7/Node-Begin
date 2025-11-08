const http = require("http");
const routes = require("./routes/index.js");
const { handleRequest } = require("./utils/processor.js");

const PORT = 3000;

const server = http.createServer((req, res) => {
  handleRequest(req, res, routes);
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
