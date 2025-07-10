import z from "zod";
import { menuSchema } from "@/schema/manage/menus";

export type Menu = z.infer<typeof menuSchema>
    