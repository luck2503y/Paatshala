const { createClerkClient, verifyToken } = require('@clerk/backend');
const { env } = require('../config/env');

let clerkClientInstance = null;

function getClerkClient() {
  if (!clerkClientInstance) {
    if (!env.CLERK_SECRET_KEY) {
      throw new Error('CLERK_SECRET_KEY is not configured in backend environment.');
    }
    clerkClientInstance = createClerkClient({
      secretKey: env.CLERK_SECRET_KEY,
      publishableKey: env.CLERK_PUBLISHABLE_KEY || undefined,
    });
  }
  return clerkClientInstance;
}

/**
 * Verifies a Clerk JWT session token.
 * @param {string} token - The raw Bearer token from the request.
 * @returns {Promise<Object>} Decoded token payload if valid.
 */
async function verifyClerkSessionToken(token) {
  if (!token || typeof token !== 'string') {
    throw new Error('Token is missing or not a string.');
  }

  if (!env.CLERK_SECRET_KEY) {
    throw new Error('CLERK_SECRET_KEY is not configured.');
  }

  // Official verifyToken from @clerk/backend
  const verified = await verifyToken(token, {
    secretKey: env.CLERK_SECRET_KEY,
  });

  return verified;
}

/**
 * Retrieves user details from Clerk by User ID.
 * @param {string} userId
 */
async function getClerkUser(userId) {
  const client = getClerkClient();
  return await client.users.getUser(userId);
}

module.exports = {
  getClerkClient,
  verifyClerkSessionToken,
  getClerkUser,
};
