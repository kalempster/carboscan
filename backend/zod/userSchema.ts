import { User } from "@prisma/client";
import { z } from "zod";
import { zObject } from "./productSchema";

export const userSchema = zObject<Omit<User, "password">>({
    id: z.string().cuid(),
    username: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type userSchemaType = z.infer<typeof userSchema>;
