import { randomUUID } from "node:crypto";
import type { Product } from "../models/index.ts";

export function createProduct(data: Omit<Product, "id">): Product {
    // Create the product
    const newProduct: Product = {
        id: randomUUID(),
        description: data.description ?? "Aucune description fournie",
        ...data
    }
    return newProduct;
}

export function updateProduct(existing: Product, data: Omit<Product, "id">): Product {
    return {
        ...existing,
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description ?? (existing.description ?? "Aucune description fournie")
    };
}

export function patchProduct(existing: Product, data: Omit<Partial<Product>, 'id'>): Product {
    return {
        ...existing,
        name: data.name ?? existing.name,
        price: data.price ?? existing.price,
        stock: data.stock ?? existing.stock,
        description: data.description ?? (existing.description ?? "Aucune description fournie")
    };
}