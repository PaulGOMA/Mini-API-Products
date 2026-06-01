import { ErrorRegistry } from "./error.registry.ts";

ErrorRegistry.getInstance().register("SyntaxError", {
    status: 400,
    serialize: () => ({
        status: 400,
        error: "Invalid JSON",
        message: "The JSON body is malformed"
    })
});
