import type { IncomingMessage, ServerResponse } from "node:http";
import { createProduct, patchProduct, updateProduct } from "../services/products.service.ts";
import { assertHasRequiredFields, assertIsValidUUID, assertTypeField } from "../validations/index.ts";
import { HttpError } from "../errors/error.http.ts";
import { handleError } from "../errors/error.handler.ts";
import { productStorage } from "../infrastructures/persistences/repositories/products.inmemory.repository.ts";

export function createProductController(req: IncomingMessage, res: ServerResponse) {

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
        if (body.length > 1e6) req.socket.destroy();
    });

    req.on('end', () => {
        try {
            // Content-Type check INSIDE try/catch
            if (req.headers['content-type'] !== 'application/json') {
                throw new HttpError(415, "Content-Type must be 'application/json'");
            }

            // Parse JSON
            const data = JSON.parse(body);

            // Validate fields
            assertHasRequiredFields(["name", "price", "stock"], data);
            assertTypeField("name", "string", data);
            assertTypeField("price", "number", data);
            assertTypeField("stock", "number", data);

            // Create product
            const product = createProduct(data);

            // Save product
            productStorage.save(product);

            // Success
            res.statusCode = 201;
            res.end(JSON.stringify(product));

        } catch (e) {
            handleError(e, res);
        }
    });
}


export function getProductsController(res: ServerResponse) {
    try {
        // Retrieve all products
        const products = productStorage.findAll();

        res.statusCode = 200;
        res.end(JSON.stringify(products))
    } catch (e: unknown) {
        handleError(e, res);
    }
}

export function getProductByIdController(res: ServerResponse, id: string | undefined) {
    try {
        if(!id || !assertIsValidUUID(id))
            throw new HttpError(400, "Invalid product ID");

        const product = productStorage.findById(id);

        if(!product)
            throw new HttpError(404, "Product not found");

        res.statusCode = 200;
        res.end(JSON.stringify(product));
    } catch (e: unknown) {
        handleError(e, res);
    }
}

export function updateProductController(req: IncomingMessage, res: ServerResponse, id: string | undefined) {
    let body = "";

    req.on('data', chunk => {
        body += chunk.toString();
        if (body.length > 1e6) req.socket.destroy();
    });

    req.on('end', () => {
        try {
            if(!id || !assertIsValidUUID(id))
                throw new HttpError(400, "Invalid product ID");

            const existingProduct = productStorage.findById(id);

            if(!existingProduct)
                throw new HttpError(404, "Product not found");

            if(req.headers["content-type"] !== "application/json")
                throw new HttpError(415, "Content-Type must be 'application/json'");

            const data = JSON.parse(body);

            assertHasRequiredFields(["name", "price", "stock"], data);
            assertTypeField("name", "string", data);
            assertTypeField("price", "number", data);
            assertTypeField("stock", "number", data);

            if(data.hasOwnProperty("description"))
                assertTypeField("description", "string", data);

            const productUpdated = updateProduct(existingProduct, data);

            productStorage.save(productUpdated);

            res.statusCode = 200;
            res.end(JSON.stringify(productUpdated));

        } catch (e: unknown) {
            handleError(e, res);
        }
    })
}

export function patchProductController(req: IncomingMessage, res: ServerResponse, id: string | undefined) {
    let body = "";

    req.on("data", chunck => {
        body += chunck.toString();
        if (body.length > 1e6)
            req.socket.destroy();
    })

    req.on("end", () => {
        try {
            if(req.headers["content-type"] !== "application/json")
                throw new HttpError(415, "Content-Type must be 'application/json'");

            if(!id || !assertIsValidUUID(id))
                throw new HttpError(400, "Invalid product ID");

            const existingProduct = productStorage.findById(id);

            if(!existingProduct)
                throw new HttpError(404, "Product not found");

            const data = JSON.parse(body);

            if(data.hasOwnProperty("name"))
                assertTypeField("name", "string", data);

            if(data.hasOwnProperty("price"))
                assertTypeField("price", "number", data);
            
            if(data.hasOwnProperty("stock"))
                assertTypeField("stock", "number", data);

            if(data.hasOwnProperty("description"))
                assertTypeField("description", "string", data);
        
            const productPatched = patchProduct(existingProduct, data);

            productStorage.save(productPatched);

            res.statusCode = 200;
            res.end(JSON.stringify(productPatched));

        } catch (e: unknown) {
            handleError(e, res);
        }
    })
}

export function deleteProductController(res: ServerResponse, id: string | undefined) {
    try {
        if(!id || !assertIsValidUUID(id))
            throw new HttpError(400, "Invalid product ID");

        const existingProduct = productStorage.findById(id);

        if(!existingProduct)
            throw new HttpError(404, "Product not found");

        productStorage.delete(id);

        res.statusCode = 204;
        res.end();

    } catch (e: unknown) {
        handleError(e, res);
    }
}
