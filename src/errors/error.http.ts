import { ErrorRegistry } from "./error.registry.ts";

export class HttpError extends Error {
    public status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = "HttpError";
        this.status = status
    }
}

ErrorRegistry.getInstance().register("HttpError", {
    status: 400,
    serialize: (e: HttpError) => ({
        status: e.status,
        error: e.name,
        message: e.message
    })
});
