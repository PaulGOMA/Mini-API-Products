import type { IncomingMessage, ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import { handleError } from "../errors/error.handler.ts";

export function handleStaticRoute(req: IncomingMessage, res: ServerResponse) {

    const url = req.url?.trim().replace(/\/+$/, "") || "";

    // GET /openapi
    if (req.method === "GET" && url === "/openapi") {
        try {
            const openApiFile = readFileSync("./docs/openapi.yaml", "utf-8");
            res.setHeader("Content-Type", "application/yaml");
            res.statusCode = 200;
            return res.end(openApiFile);
        } catch (e) {
            return handleError(e, res);
        }
    }

    // GET /docs
    if (req.method === "GET" && url === "/docs") {
        try {
            const docFile = readFileSync("./docs/docs.html", "utf-8");
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            return res.end(docFile);
        } catch (e) {
            return handleError(e, res);
        }
    }

    // Indicates that the road has not been maintained
    return false;
}
