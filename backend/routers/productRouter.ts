import z from "zod";
import { prisma } from "../utils/prisma";
import { publicProcedure, t } from "../utils/trpc";

export const productRouter = t.router({
    getProduct: publicProcedure
        .input(z.object({ barcode: z.string() }))
        .query(async ({ input }) => {
            const data = await prisma.product.findFirst({
                where: {
                    barcode: input.barcode
                }
            });
            return data;
        })
});
