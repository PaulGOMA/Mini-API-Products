import type { Repository } from "./repository.ts";

export class InMemoryRepository<T extends{id: string}> implements Repository<T> {
    // Internal storage
    private storage = new Map<string, T>();

    public save(data: T): void{
        this.storage.set(data.id, data);
    }

    public getSizeItems(): number {
        return this.storage.size;
    }

    public findById(id: string): T | null {
        return this.storage.get(id) ?? null;
    };

    public findAll(): T[] {
        return Array.from(this.storage.values());
    };

    public delete(id: string): void {
        this.storage.delete(id);
    };
}