export interface Repository<T> {
    save: (data: T) => void;
    getSizeItems: () => number;
    findById: (id: string) => T | null;
    findAll: () => T[];
    delete: (id: string) => void;
}