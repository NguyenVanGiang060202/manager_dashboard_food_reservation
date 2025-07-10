import z from "zod";
import { categorySchema } from "@/schema/manage/categories";

export type Category = z.infer<typeof categorySchema>;