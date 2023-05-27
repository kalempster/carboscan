import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { productRouter } from "./routers/productRouter";
import { createContext, t } from "./utils/trpc";
const app = express();

export const appRouter = t.router({
    products: productRouter
});

export type AppRouter = typeof appRouter;

app.use(
    "/api",
    createExpressMiddleware({
        router: appRouter,
        createContext
    })
);

app.listen(3000, () => {
    console.log("listening");
});
