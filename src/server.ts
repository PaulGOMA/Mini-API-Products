import http from "http";
import { handleProductsRoute } from "./routes/products.route.ts";
import { handleStaticRoute } from "./routes/static.route.ts";

import "./errors/error.syntax.ts";
import "./errors/error.validation.ts";
import "./errors/error.http.ts";

export const server = http.createServer((req, res) => {

    res.setHeader("content-type", "application/json; charset=utf-8");

    // Static route
    const staticHandled = handleStaticRoute(req, res);
    if (staticHandled !== false) return;

    // Products route
    const productHandled = handleProductsRoute(req, res);
    if (productHandled !== false) return;

    // 404 otherwise
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not Found" }));
});
