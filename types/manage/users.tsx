import { userSchema, addUserSchema } from "@/schema/manage/users";
import z from "zod";


export type User = z.infer<typeof userSchema>;
export type AddUser = z.infer<typeof addUserSchema>;

  