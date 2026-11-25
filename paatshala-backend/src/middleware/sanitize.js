/**
 * Request Input Sanitization Middleware
 */
function sanitizeInput(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query);
  }
  next();
}

function sanitizeObject(obj) {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      // Strip potential script injection vectors and control characters
      obj[key] = val
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '')
        .trim();
    } else if (typeof val === 'object' && val !== null) {
      sanitizeObject(val);
    }
  }
}

module.exports = {
  sanitizeInput,
};
