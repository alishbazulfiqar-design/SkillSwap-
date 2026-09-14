import { z } from "zod";

export const createUserSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "First name is required"),

    last_name: z
      .string()
      .min(1, "Last name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email"),

    phone: z
      .string()
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      //add the one upercase and one lower case letter.
.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirm_password: z
      .string()
      .min(1, "Please confirm your password"),

    role: z
      .string()
      .min(1, "Please select a role"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });