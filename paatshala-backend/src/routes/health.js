const express = require('express');
const { checkConfigStatus, env } = require('../config/env');

const router = express.Router();

router.get('/health', (req, res) => {
  const config = checkConfigStatus();

  res.status(200).json({
    status: 'healthy',
    service: 'paatshala-backend',
    environment: env.NODE_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    configuration: {
      authReady: config.isFullyConfigured,
      missingConfigKeys: config.missingKeys,
    },
  });
});

module.exports = router;
