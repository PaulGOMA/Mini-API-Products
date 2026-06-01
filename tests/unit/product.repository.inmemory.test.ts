import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRepository } from "../../src/repositories/inmemory.repository.ts";
import type { Product } from "../../src/models/index.ts";

describe("Product in memory repository", () => {

    let fakememory: InMemoryRepository<Product>;
    let product: Product;

    beforeEach(() => {
        fakememory = new InMemoryRepository<Product>();
        product = structuredClone({
            id: "1",
            name: "Test",
            price: 10,
            stock: 5,
            description: "Produit spécial"
        });

        fakememory.save(product);
    })

    it("should save product in fake memory repository", () => {
        expect(fakememory.getSizeItems()).toBe(1);
        expect(fakememory.findById(product.id)).toEqual(product);
        expect(fakememory.findById("3")).toBeNull();
    })

    it("should a list of products", () => {
        const products = fakememory.findAll();
        expect(products.length).toBe(1);
        expect(Array.isArray(products)).toBe(true);
        expect(products).toEqual([
            {
                id: "1",
                name: "Test",
                price: 10,
                stock: 5,
                description: "Produit spécial"
            }
        ]);
    })
})