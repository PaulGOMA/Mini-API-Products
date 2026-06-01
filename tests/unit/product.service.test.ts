import { describe, it, expect } from "vitest";
import { createProduct } from "../../src/services/products.service.ts";


describe("Product Service", () => {
    it("should create a product with an id", () => {
        const product = createProduct({ name: "Test", price: 10, stock: 5 });
        expect(product.id).toBeDefined();
        expect(typeof product.id).toBe("string");
    });

    it("should set a default description when none is provided", () => {
        const product = createProduct({ name: "Test", price: 10, stock: 5 });
        expect(product.description).toBe("Aucune description fournie");
    });

    it("should keep the provided description", () => {
        const product = createProduct({
            name: "Test",
            price: 10,
            stock: 5,
            description: "Produit spécial"
        });
        expect(product.description).toBe("Produit spécial");
    });
});