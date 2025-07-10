import z from "zod";
import { orderSchema } from "@/schema/manage/order";

export type Order = z.infer<typeof orderSchema>;