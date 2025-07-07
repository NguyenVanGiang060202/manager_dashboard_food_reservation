import { loginFormSchema, signupFormSchema } from "@/schema/auth";
import z from "zod";


export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type signupFormValues = z.infer<typeof signupFormSchema>;