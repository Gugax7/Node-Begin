const parse = (pattern) => {
  const params = [];

  const regexPattern = pattern
    .replace(/\/:([^/]+)/g, (match, paramName) => {
      params.push(paramName);
      return "/([^/]+)";
    })
    .replace(/\//g, "\\/")
    .replace(/\*$/g, ".*"); // /users/:id -> /users/(regex) -> ['id':'18239481']

  const regex = new RegExp(`^${regexPattern}$`);

  return { regex, params };
};

const router = (requestPath, requestMethod, routes) => {
  for (const route of routes) {
    const { regex, params } = parse(route.path);

    const match = requestPath.match(regex);

    if (!match || route.method !== requestMethod) {
      continue;
    }

    const objectParam = {};
    params.forEach((name, index) => {
      objectParam[name] = match[index + 1];
    });

    return {
      handler: route.handler,
      middleware: route.middleware || [],
      params: objectParam,
    };
  }

  return null;
};

module.exports = { router };
