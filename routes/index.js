import express from "express";
import { payment } from "./payment/index.js";
import { products } from "./products/index.js";
import { rules } from "./rules/index.js";
import { server } from "./server/index.js";

export const api = express.Router();

api.use("/api", payment, products, rules, server);
