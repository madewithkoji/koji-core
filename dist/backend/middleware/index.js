"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = middleware;

function middleware(req, res, next) {
  res.locals.KOJI_PROJECT_ID = req.headers['x-trusted-koji-project-id'] || process.env.KOJI_PROJECT_ID;
  res.locals.KOJI_PROJECT_TOKEN = req.headers['x-trusted-koji-project-token'] || process.env.KOJI_PROJECT_TOKEN;
  next();
}
//# sourceMappingURL=index.js.map