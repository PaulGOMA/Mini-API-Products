import type { ServerResponse } from "node:http";
import { ErrorRegistry } from "./error.registry.ts";

export function handleError(e: any, res: ServerResponse) {
    const registry = ErrorRegistry.getInstance();
    const descriptor = registry.get(e.name);

    if (!descriptor) {
        res.statusCode = 500;
        return res.end(JSON.stringify({
            status: 500,
            error: "Internal Server Error",
            message: "An unexpected error occurred"
        }));
    }

    const serialized = descriptor.serialize(e);

    res.statusCode = serialized.status;
    return res.end(JSON.stringify(serialized));
}
