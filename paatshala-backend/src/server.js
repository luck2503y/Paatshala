const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { env, checkConfigStatus } = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimiter');
const { sanitizeInput } = require('./middleware/sanitize');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');

const app = express();

// Trust reverse proxy headers in production (for rate-limiter, protocol, IP)
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Mobile API backend
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow mobile apps (no origin), localhost, and configured origins
      if (!origin || env.ALLOWED_ORIGINS.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsing with strict size limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Input sanitization
app.use(sanitizeInput);

// General rate limiter on all /api routes
app.use('/api', apiLimiter);

// Mount Routes
app.use('/', healthRoutes);
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

// Start Server if run directly
if (require.main === module) {
  const server = app.listen(env.PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🛡️  Paatshala Secure Backend running on port ${env.PORT}`);
    console.log(`   Environment: ${env.NODE_ENV}`);
    console.log(`   Health Check: http://localhost:${env.PORT}/api/health`);
    
    const configStatus = checkConfigStatus();
    if (!configStatus.isFullyConfigured) {
      console.log(`⚠️  Configuration note: Missing [${configStatus.missingKeys.join(', ')}] in .env`);
      console.log(`   Fill in paatshala-backend/.env to enable live Clerk & Firebase verification.`);
    } else {
      console.log(`✅  Clerk & 2-User Allowlist configured.`);
    }
    console.log(`======================================================\n`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log('\nShutting down server...');
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

module.exports = app;
