// user.schema.ts
import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  role: z.enum(['user', 'admin'], { message: "Role must be either 'user' or 'admin'" }),
});



