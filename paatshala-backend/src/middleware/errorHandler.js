const { env } = require('../config/env');

/**
 * 404 Not Found Middleware
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.originalUrl} does not exist.`,
  });
}

/**
 * Central Error Handling Middleware
 */
function errorHandler(err, req, res, next) {
  console.error('[Error]', {
    method: req.method,
    url: req.originalUrl,
    error: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  const statusCode = err.statusCode || err.status || 500;
  const response = {
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.',
  };

  // Only attach stack trace in development
  if (env.NODE_ENV === 'development' && statusCode === 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
