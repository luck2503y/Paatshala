const http = require('http');
const assert = require('assert');

// Mock environment variables for testing authorization allowlist
process.env.PORT = '5001';
process.env.NODE_ENV = 'test';
process.env.CLERK_SECRET_KEY = 'sk_test_mock_secret_key_12345';
process.env.ADMIN_CLERK_USER_ID = 'user_admin_test_123';
process.env.FRIEND_CLERK_USER_ID = 'user_friend_test_456';

// Stub clerkService.verifyClerkSessionToken for testing allowlist logic
const clerkService = require('../src/services/clerkService');
clerkService.verifyClerkSessionToken = async (token) => {
  if (token === 'admin_valid_token') {
    return { sub: 'user_admin_test_123' };
  }
  if (token === 'friend_valid_token') {
    return { sub: 'user_friend_test_456' };
  }
  if (token === 'unauthorized_user_token') {
    return { sub: 'user_intruder_test_999' };
  }
  throw new Error('Invalid token');
};

const app = require('../src/server');

let server;
const BASE_URL = 'http://127.0.0.1:5001';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = JSON.parse(body);
          } catch (e) {
            parsed = body;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Paatshala Backend Security & Allowlist Tests...\n');
  let passed = 0;
  let failed = 0;

  await new Promise((res) => {
    server = app.listen(5001, '127.0.0.1', res);
  });

  try {
    // Test 1: Health check endpoint
    const healthRes = await request('/api/health');
    assert.strictEqual(healthRes.status, 200);
    assert.strictEqual(healthRes.body.status, 'healthy');
    console.log('  ✅ [PASS] GET /api/health returns 200 Healthy');
    passed++;

    // Test 2: Missing Authorization header on protected route
    const missingAuthRes = await request('/api/auth/me');
    assert.strictEqual(missingAuthRes.status, 401);
    assert.strictEqual(missingAuthRes.body.error, 'Unauthorized');
    console.log('  ✅ [PASS] Missing token returns 401 Unauthorized');
    passed++;

    // Test 3: Invalid token format / verification failure
    const invalidTokenRes = await request('/api/auth/me', {
      headers: { Authorization: 'Bearer totally_invalid_token' },
    });
    assert.strictEqual(invalidTokenRes.status, 401);
    console.log('  ✅ [PASS] Invalid token returns 401 Unauthorized');
    passed++;

    // Test 4: Authenticated user NOT on the allowlist (must be 403 Forbidden)
    const intruderRes = await request('/api/auth/me', {
      headers: { Authorization: 'Bearer unauthorized_user_token' },
    });
    assert.strictEqual(intruderRes.status, 403);
    assert.strictEqual(intruderRes.body.error, 'Forbidden');
    assert.strictEqual(intruderRes.body.code, 'ACCOUNT_NOT_ALLOWLISTED');
    console.log('  ✅ [PASS] Non-allowlisted Clerk user rejected with 403 Forbidden');
    passed++;

    // Test 5: Allowlisted Admin User (Participant A)
    const adminRes = await request('/api/auth/me', {
      headers: { Authorization: 'Bearer admin_valid_token' },
    });
    assert.strictEqual(adminRes.status, 200);
    assert.strictEqual(adminRes.body.role, 'A');
    assert.strictEqual(adminRes.body.userId, 'user_admin_test_123');
    console.log('  ✅ [PASS] Admin user authenticated & authorized as Role "A"');
    passed++;

    // Test 6: Allowlisted Friend User (Participant D)
    const friendRes = await request('/api/auth/me', {
      headers: { Authorization: 'Bearer friend_valid_token' },
    });
    assert.strictEqual(friendRes.status, 200);
    assert.strictEqual(friendRes.body.role, 'D');
    assert.strictEqual(friendRes.body.userId, 'user_friend_test_456');
    console.log('  ✅ [PASS] Friend user authenticated & authorized as Role "D"');
    passed++;

    // Test 7: 404 handler for undefined routes
    const notFoundRes = await request('/api/non-existent-endpoint');
    assert.strictEqual(notFoundRes.status, 404);
    assert.strictEqual(notFoundRes.body.error, 'Not Found');
    console.log('  ✅ [PASS] Undefined routes return 404 Not Found');
    passed++;

    console.log(`\n🎉 All ${passed} tests passed successfully! (0 failed)\n`);
  } catch (err) {
    console.error('❌ Test failure:', err);
    failed++;
  } finally {
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
