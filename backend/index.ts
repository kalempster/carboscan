import express from "express";
import { productRouter } from "./routers/productRouter";
import { t } from "./utils/trpc";
const app = express();

export const appRouter = t.router({
    products: productRouter
});
