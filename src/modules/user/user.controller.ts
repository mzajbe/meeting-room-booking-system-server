
// user.controller.ts
import { Request, Response } from 'express';
import { createUser } from './user.service';
import { z } from 'zod';
import { userValidationSchema } from './user.validation';

export const signUp = async (req: Request, res: Response) => {
    try {
      // Validate request body using Zod schema
      const validatedData = userValidationSchema.parse(req.body);
  
      // Create user with validated data
      const user = await createUser(validatedData);
  
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          address: user.address,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Send Zod validation errors
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Validation error',
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        statusCode: 500,
        // message: error.message,
        message:"success done"
      });
    }
  };