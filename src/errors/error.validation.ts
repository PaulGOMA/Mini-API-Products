import { ErrorRegistry } from "./error.registry.ts";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

ErrorRegistry.getInstance().register("ValidationError", {
    status: 400,
    serialize: (e: ValidationError) => ({
        status: 400,
        error: e.name,
        message: e.message
    })
});
