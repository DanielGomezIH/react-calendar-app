import { z } from 'zod';
import { RegisterFormData } from '../RegisterPage';

export const RegisterSchema: z.ZodType<RegisterFormData> = z.object({
  name: z.string().min(2, {
    message: 'Your name must be al least 2 characters',
  }),

  email: z.string().email({
    message: 'Your email is invalid',
  }),

  password: z.string().min(8, {
    message: 'Your password must be al least 8 characters',
  }),
});
