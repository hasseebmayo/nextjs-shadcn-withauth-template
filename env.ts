import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
 server: {
  //  Server Env
  BASE_URL: z.string({
   required_error: 'TOKEN_SECRET_KEY is required',
  }),
  GOOGLE_OAUTH_SECRET_KEY: z.string({
   required_error: 'BASE_URL is required',
  }),
  GOOGLE_OAUTH_PUBLIC_KEY: z.string({
   required_error: 'BASE_URL is required',
  }),
 },
 client: {
  NEXT_PUBLIC_API_BASE_URL: z
   .string({
    required_error: 'API_BASE_URL is required',
   })
   .min(1),
 },
 runtimeEnv: {
  GOOGLE_OAUTH_SECRET_KEY: process.env.GOOGLE_OAUTH_SECRET_KEY,
  GOOGLE_OAUTH_PUBLIC_KEY: process.env.GOOGLE_OAUTH_PUBLIC_KEY,
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  /*Note everything you have in your server must also come here otherwise you'll get error of missing*/
 },
});
