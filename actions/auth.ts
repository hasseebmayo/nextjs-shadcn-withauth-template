/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import axios, { AxiosError } from 'axios';
import { API_URL } from '@/lib/constants';
import { revalidatePath } from 'next/cache';
// import { revalidatePath } from 'next/cache';
export type UserPayload = {
 user: 'patient' | 'doctor' | undefined;
 clinic: [] | undefined;
 token: string;
};
export type IResponse = {
 data: {
  user: [];
  token: string;
 };
 message: string;
};
const secretKey = process.env.SECRET_KEY as string;

const key = new TextEncoder().encode(secretKey);
export async function encrypt(payload: UserPayload) {
 try {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 100);
  return await new SignJWT(payload)
   .setProtectedHeader({ alg: 'HS256' })
   .setIssuedAt()
   .setExpirationTime('1yr')
   .sign(key);
 } catch (error) {
  throw new Error('Failed to encrypt payload');
 }
}

export async function decrypt(input: string): Promise<UserPayload> {
 const { payload } = await jwtVerify(input, key, {
  algorithms: ['HS256'],
 });
 if (!payload) {
  (await cookies()).set('session', '', { maxAge: 0 });
 }
 return payload as UserPayload;
}
export async function getSession(): Promise<UserPayload | undefined> {
 const session = (await cookies()).get('session')?.value as string;
 if (!session) {
  return undefined;
 }
 const parsedSession = await decrypt(session);
 return parsedSession as UserPayload;
}

export async function loginAction(payload: {
 email: string;
 password: string;
}): Promise<{
 status: 'error' | 'success';
 role?: 'patient' | 'doctor';
 message: string;
}> {
 try {
  const { email, password } = payload;
  const response = axios.post<IResponse>(`${API_URL}/auth/user/login`, {
   email,
   password,
  });

  const data = (await response).data.data;
  const sessionData = await encrypt({
   user: 'patient',
   token: data.token,
   clinic: undefined,
  });
  (await cookies()).set('session', sessionData, {
   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
   httpOnly: true,
  });
  // revalidatePath('/');
  return {
   message: 'Logged in successfully',
   status: 'success',
   //    role: data.user.role,
  };
 } catch (error) {
  console.log(error);
  if (error instanceof AxiosError) {
   return {
    status: 'error',
    message: error.response?.data.message,
   };
  }
  // Handle other types of errors (if any)
  return {
   status: 'error',
   message: 'An unexpected error occurred',
  };
 }
}
export async function logoutAction() {
 try {
  (await cookies()).set('session', '', { maxAge: 0 });
  // revalidatePath('/');
  return { status: 'success', message: 'Logged out successfully' };
 } catch (error) {
  return {
   status: 'error',
   message: 'Failed to log out',
  };
 }
}

export async function updateUserSession(payload: 'patient'): Promise<{
 status: 'error' | 'success';
 message: string;
}> {
 const session = await getSession();
 if (!session) {
  return {
   status: 'error',
   message: 'Session not found',
  };
 }
 const sessionData = await encrypt({
  user: payload,
  token: session.token,
  clinic: session.clinic,
 });
 (await cookies()).set('session', sessionData, {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  httpOnly: true,
 });
 revalidatePath('/');
 return {
  status: 'success',
  message: 'Profile updated successfully',
 };
}
