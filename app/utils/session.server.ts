import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { compare, hash } from 'bcrypt';

import { prisma } from '~/db';

// login user
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) return null;

  // check password
  const isCorrectPassword = await compare(password, user.passwordHash);
  return !isCorrectPassword ? null : user;
};

// register new user
export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const passwordHash = await hash(password, 10);
  return prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });
};

// get session secret
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error('No session secret');

// create session storage
const storage = createCookieSessionStorage({
  cookie: {
    name: 'remix-blog_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 60,
    httpOnly: true,
  },
});

// create session
export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
};

// get user session
export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'));
};

// get logged in user
export const getUser = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

// log out user and destroy session
export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect('/logout', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
};
