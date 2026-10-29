import crypto from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'ckw_admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'ckw_enterprise_secret_key_change_me_in_production_2026';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Hours

export interface AdminSessionUser {
  id: number | string;
  username: string;
  name: string;
  role: 'superadmin' | 'editor';
}

export interface SessionPayload {
  user: AdminSessionUser;
  exp: number;
  iat: number;
}

/**
 * Sign a payload with HMAC-SHA256
 */
export function signToken(data: string): string {
  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(data);
  return hmac.digest('hex');
}

/**
 * Create a tamper-proof signed session token
 */
export function createSessionToken(user: AdminSessionUser): string {
  const payload: SessionPayload = {
    user,
    iat: Date.now(),
    exp: Date.now() + SESSION_EXPIRY_MS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signToken(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verify and decode session token
 */
export function verifySessionToken(token: string): AdminSessionUser | null {
  try {
    if (!token || typeof token !== 'string') return null;

    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, signature] = parts;
    const expectedSignature = signToken(encodedPayload);

    // Timing-safe comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature, 'hex');
    const expBuf = Buffer.from(expectedSignature, 'hex');
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

    // Check expiration
    if (Date.now() > payload.exp) {
      return null;
    }

    return payload.user;
  } catch (error) {
    return null;
  }
}

/**
 * Hash password safely using SHA-256 with salt
 */
export function hashPassword(password: string, salt: string = 'ckw_salt_2026'): string {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

/**
 * Read current session from HttpOnly cookies in Server Components / Route Handlers
 */
export async function getSession(): Promise<AdminSessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Set HttpOnly secure session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

