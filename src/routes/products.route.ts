import type { IncomingMessage, ServerResponse } from "node:http";
import {
    createProductController,
    deleteProductController,
    getProductByIdController,
    getProductsController,
    patchProductController,
    updateProductController
} from "../controllers/products.controller.ts";

export function handleProductsRoute(req: IncomingMessage, res: ServerResponse) {

    const url = req.url?.trim().replace(/\/+$/, "") || "";

    // GET /products
    if (req.method === "GET" && url === "/products")
        return getProductsController(res);

    // GET /products/:id
    if (req.method === "GET" && url.startsWith("/products/")) {
        const id = url.split("/")[2];
        return getProductByIdController(res, id);
    }

    // POST /products
    if (req.method === "POST" && url === "/products")
        return createProductController(req, res);

    // PUT /products/:id
    if (req.method === "PUT" && url.startsWith("/products/")) {
        const id = url.split("/")[2];
        return updateProductController(req, res, id);
    }

    // PATCH /products/:id
    if (req.method === "PATCH" && url.startsWith("/products/")) {
        const id = url.split("/")[2];
        return patchProductController(req, res, id);
    }

    // DELETE /products/:id
    if (req.method === "DELETE" && url.startsWith("/products/")) {
        const id = url.split("/")[2];
        return deleteProductController(res, id);
    }

    // Indicates that the road has not been maintained
    return false; 
}
