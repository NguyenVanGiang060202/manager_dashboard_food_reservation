
import { tableSchema } from "@/schema/manage/tables";
import z from "zod";


export type Table = z.infer<typeof tableSchema>;

  