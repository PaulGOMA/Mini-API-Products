interface ErrorDescriptor {
    status: number;
    serialize: (e: any) => {
        status: number;
        error: string;
        message: string;
    };
}

export class ErrorRegistry {
    private static instance: ErrorRegistry;
    private map = new Map<string, ErrorDescriptor>();

    private constructor() {}

    public static getInstance() {
        if (!ErrorRegistry.instance) {
            ErrorRegistry.instance = new ErrorRegistry();
        }
        return ErrorRegistry.instance;
    }

    register(name: string, descriptor: ErrorDescriptor) {
        this.map.set(name, descriptor);
    }

    get(name: string) {
        return this.map.get(name);
    }
}
