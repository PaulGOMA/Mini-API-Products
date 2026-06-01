import { describe, it, expect } from "vitest";
import { assertHasRequiredFields, assertIsValidUUID, assertTypeField } from "../../src/validations/index.ts";
import { ValidationError } from "../../src/errors/error.validation.ts";
import { randomUUID } from "node:crypto";

describe("Data field validation", () => {
    it("should throw an error if any given fields are missing and pass otherwise", () => {
        const data = { "name": "Test", "price": 10, "stock": 5 };
        expect(() => assertHasRequiredFields(["description", "name"], data)).toThrow(ValidationError);
        expect(() => assertHasRequiredFields(["description", "name"], data)).toThrow("Les données fournies sont incomplètes");
        expect(() => assertHasRequiredFields(["price", "name"], data)).not.toThrow();
    });

    it("should throw an error if any given field has not a good type and pass otherwise", () => {
        const data = { "name": "Test", "price": "10", "stock": 5 };
        expect(() => assertTypeField("price", "number", data)).toThrow(ValidationError);
        expect(() => assertTypeField("price", "number", data)).toThrow("Le type de la donnée est invalid");
        expect(() => assertTypeField("stock", "number", data)).not.toThrow();
    })
})

describe("Id validation", () => {
    it("should retrun true if it's a 'UUID' id or false otherwise", () => {
        const id1 = randomUUID();
        const id2 = "id-2"
        expect(assertIsValidUUID(id1)).toBe(true);
        expect(assertIsValidUUID(id2)).toBe(false);
    })
})