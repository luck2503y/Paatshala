const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { generateFirebaseCustomToken } = require('../services/firebaseBridgeService');

const router = express.Router();

/**
 * GET /api/auth/me
 * Protected endpoint to verify session and retrieve assigned participant role ('A' | 'D').
 */
router.get('/me', authLimiter, requireAuth, (req, res) => {
  res.status(200).json({
    status: 'authorized',
    userId: req.auth.userId,
    role: req.auth.role,
    authorizedAt: new Date().toISOString(),
  });
});

/**
 * POST /api/auth/firebase-token
 * Protected endpoint: Issues a Firebase Custom Auth token to an allowlisted participant.
 */
router.post('/firebase-token', authLimiter, requireAuth, async (req, res, next) => {
  try {
    const { userId, role } = req.auth;
    const tokenData = await generateFirebaseCustomToken(userId, role);

    res.status(200).json({
      status: 'success',
      ...tokenData,
    });
  } catch (error) {
    if (error.message && error.message.includes('Firebase Admin is not configured')) {
      return res.status(503).json({
        error: 'Service Unavailable',
        message: 'Firebase token bridge is awaiting service account credentials (Phase 7C).',
      });
    }
    next(error);
  }
});

module.exports = router;
