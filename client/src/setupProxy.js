const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/graphql", { target: "https://localhost:8000" }));
};
