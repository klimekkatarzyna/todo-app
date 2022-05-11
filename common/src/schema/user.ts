import { object, string, InferType } from "yup";

export const loginValidationSchema = object({
  email: string().email().required("Required"),
  password: string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

export type LoginValidationType = InferType<typeof loginValidationSchema>;

export const registerValidationSchema = object({
  username: string().required("Required"),
  email: string().email().required("Required"),
  password: string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

export type RegisterValidationType = InferType<typeof registerValidationSchema>;
