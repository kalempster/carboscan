import { Product } from "@prisma/client";
import { z } from "zod";

type AnyObj = Record<PropertyKey, unknown>;

type ZodObj<T extends AnyObj> = {
    [key in keyof T]: z.ZodType<T[key]>;
};

export const zObject = <T extends AnyObj>(arg: ZodObj<T>) => z.object(arg);

export const productSchema = zObject<Product>({
    id: z.string().cuid(),
    barcode: z.string(),
    carbonFootprint: z.number(),
    description: z.string(),
    name: z.string()
});

export type ProductSchemaType = z.infer<typeof productSchema>;
