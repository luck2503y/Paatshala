const { env } = require('../config/env');
const { verifyClerkSessionToken } = require('../services/clerkService');

/**
 * Authentication and Two-Account Allowlist Middleware
 * 
 * Enforces:
 * 1. Valid Clerk JWT Bearer token in Authorization header.
 * 2. Exact match against the two authorized Clerk User IDs:
 *    - ADMIN_CLERK_USER_ID => Role 'A' (Administrator)
 *    - FRIEND_CLERK_USER_ID => Role 'D' (Friend)
 * 3. Immediate 403 Forbidden rejection for any other authenticated account.
 */
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or malformed Authorization header. Expected Bearer token.',
      });
    }

    const token = authHeader.split(' ')[1]?.trim();
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Bearer token is empty.',
      });
    }

    // Verify token using Clerk
    let decoded;
    try {
      decoded = await verifyClerkSessionToken(token);
    } catch (err) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired session token.',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }

    const userId = decoded.sub;
    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token does not contain a valid user identity.',
      });
    }

    // Server-Side Two-User Allowlist Enforcement
    const adminId = env.ADMIN_CLERK_USER_ID?.trim();
    const friendId = env.FRIEND_CLERK_USER_ID?.trim();

    let role = null;
    if (adminId && userId === adminId) {
      role = 'A';
    } else if (friendId && userId === friendId) {
      role = 'D';
    }

    // If the user ID does not match either authorized account, reject immediately
    if (!role) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Account not authorized. Paatshala access is restricted to authorized accounts only.',
        code: 'ACCOUNT_NOT_ALLOWLISTED',
      });
    }

    // Attach authenticated identity to request
    req.auth = {
      userId,
      role,
      claims: decoded,
    };

    next();
  } catch (error) {
    console.error('Auth middleware unexpected error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication processing failed.',
    });
  }
}

module.exports = {
  requireAuth,
};
