import { z } from "zod";
import { menuSchema } from "./menus";
import { tableSchema } from "./tables";
import { userSchema } from "./users";

export const orderSchema = z.object({
    _id: z.string(),
    customer: userSchema,
    orderType: z.enum(["dine-in", "takeaway"]),
    menu: menuSchema,
    status: z.enum(["pending", "preparing", "served", "completed", "cancelled"]).optional(),
    table: tableSchema.optional(),
    isAvailable: z.boolean(),
    deleted: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
})