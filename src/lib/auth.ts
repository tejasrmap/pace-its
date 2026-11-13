import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import prisma from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'pace_its_secure_jwt_secret_gt_innox_2026';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: string[];
  departmentId?: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: AuthUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(req: NextRequest): Promise<AuthUser | null> {
  // Check Authorization header
  const authHeader = req.headers.get('authorization');
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    // Check cookie
    const cookieToken = req.cookies.get('pace_admin_token')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Verify user is active in DB
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { roles: { include: { role: true } } }
  });

  if (!user || !user.isActive) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles.map(r => r.role.name),
    departmentId: user.departmentId
  };
}

export function checkRole(user: AuthUser | null, allowedRoles: string[]): boolean {
  if (!user) return false;
  if (user.roles.includes('SUPER_ADMIN')) return true;
  return user.roles.some(r => allowedRoles.includes(r));
}

