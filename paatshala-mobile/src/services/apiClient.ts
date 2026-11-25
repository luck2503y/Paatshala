const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export interface AuthProfileResponse {
  status: 'authorized';
  userId: string;
  role: 'A' | 'D';
  authorizedAt: string;
}

export interface FirebaseTokenResponse {
  status: 'success';
  customToken: string;
  firebaseUid: string;
  role: 'A' | 'D';
}

export class ApiError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

/**
 * Validates the user's Clerk session token with the Paatshala backend
 * and retrieves their assigned role ('A' for Admin, 'D' for Friend).
 */
export async function verifyBackendAuthorization(sessionToken: string): Promise<AuthProfileResponse> {
  const url = `${BACKEND_URL}/api/auth/me`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.message || `Backend authorization failed with status ${response.status}`,
      response.status,
      data.code
    );
  }

  return data as AuthProfileResponse;
}

/**
 * Requests a Firebase custom authentication token from the backend bridge
 * using the verified Clerk session.
 */
export async function requestFirebaseCustomToken(sessionToken: string): Promise<FirebaseTokenResponse> {
  const url = `${BACKEND_URL}/api/auth/firebase-token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.message || `Firebase custom token generation failed with status ${response.status}`,
      response.status,
      data.code
    );
  }

  return data as FirebaseTokenResponse;
}
