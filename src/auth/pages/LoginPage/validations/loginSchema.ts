import { z } from 'zod';
import { LoginFormData } from '../LoginPage';

export const LoginSchema: z.ZodType<LoginFormData> = z.object({
  email: z.string().email({
    message: 'Your email is invalid',
  }),
  password: z
    .string()
    .min(8, { message: 'Your password must be at least 8 characters' }),
});
