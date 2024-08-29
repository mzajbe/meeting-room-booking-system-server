import { z } from "zod";

const loginValidationSchema = z.object({
body: z.object({
    email: z.string({required_error:'email is reqired'}),
    password:z.string({required_error:'Password is required'})
}),
});

export const AuthValidation = {
    loginValidationSchema,
};