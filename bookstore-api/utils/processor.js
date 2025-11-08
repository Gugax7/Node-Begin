const { router } = require("./router");
const url = require("url");

const handleRequest = (req, res, routes) => {
  const parsedUrl = url.parse(req.url, true);
  const requestPath = parsedUrl.pathname;
  const requestMethod = req.method.toUpperCase();
  const query = parsedUrl.query;

  req.query = query;

  const matchedRoute = router(requestPath, requestMethod, routes);

  if (matchedRoute) {
    req.params = matchedRoute.params;

    const middlewareChain = [...matchedRoute.middleware, matchedRoute.handler];

    let middlewareIndex = 0;

    const next = (err) => {
      if (err) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ success: false, message: "Internal Server Error" })
        );

        console.error("Error in middleware chain: " + err);

        return;
      }

      if (middlewareIndex < middlewareChain.length) {
        const currentFunction = middlewareChain[middlewareIndex];

        middlewareIndex++;

        if (currentFunction.length === 3) {
          currentFunction(req, res, next);
        } else {
          currentFunction(req, res);
        }
      }
    };

    next();
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Route Not found!" }));
  }
};

module.exports = { handleRequest };
