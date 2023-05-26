import express from "express";

const app = express();
import { createContext, t } from "./utils/trpc";
export const appRouter = t.router({
    //products: productRouter
});

