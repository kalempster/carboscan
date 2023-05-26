import express from "express";
import { createContext, t } from "./utils/trpc";
import { productRouter } from "./routers/productRouter";
const app = express();

export const appRouter = t.router({
    products: productRouter
});

