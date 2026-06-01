import {describe, it, expect } from "vitest";
import request from 'supertest';
import { server } from '../../src/server.ts';
import { randomUUID } from "node:crypto";

describe("Test the POST Method on the '/products' endpoint", () => {
    it("shoud return '201' when JSON is valid", async () => {
        const response = await request(server)
            .post("/products")
            .send({ name: "Test", price: 10, stock: 5})
            .set("Content-Type", "application/json");

        expect(response.status).toBe(201);
    });

    it("should return '404' when  route is not valid", async () => {
        const response = await request(server)
            .post("/product")
            .send({ name: "Test", price: 10, stock: 45})
            .set("Content-Type", "application/json");

        expect(response.status).toBe(404);
    })

    it("should return '415' when content-type is not valid", async () => {
        const response = await request(server)
            .post("/products")
            .send("name=Test&price=10&stock=45")
            .set("Content-Type", "text/plain");

        expect(response.status).toBe(415);
    });

    it("should return 400 for invalid JSON", async() => {
        const response = await request(server)
            .post("/products")
            .set("Content-Type", "application/json")
            .send("invalid json");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid JSON");
    });

    it("should return 400 for invalid data", async() => {
        const response = await request(server)
            .post("/products")
            .set("Content-Type", "application/json")
            .send({ name: "Old", price: "10", stock: 5 });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("ValidationError");
    });
});


describe("Test the GET Method on the '/products' endpoint", () => {
    it("should return 200 and an array when calling GET /products", async () => {
        const response = await request(server)
            .get("/products")
            .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return the list of products after POST", async () => {
        await request(server)
            .post("/products")
            .send({name: 'Test', price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const response = await request(server)
            .get("/products")
            .set("Content-Type", "application/jon");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe("Test");
    })
});

describe("Test GET /products/:id", () => {
    it("should return 404 when product does not exist", async () => {
        const response = await request(server)
            .get(`/products/${randomUUID()}`)
            .set("Content-Type", "application/json");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("HttpError");
    });

    it("should return 400 when ID is invalid", async () => {
        const response = await request(server)
            .get("/products/1")
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
    });

    it("should return 200 and the product when ID exists", async () => {
        const post = await request(server)
            .post("/products/")
            .send({name: 'Test', price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .get(`/products/${id}`)
            .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
    });
});

describe("Test PUT /products/:id", () => {

    it("should return 404 when product does not exist", async () => {
        const response = await request(server)
            .put(`/products/${randomUUID()}`)
            .send({ name: "X", price: 1, stock: 1 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(404);
    });

    it("should return 400 when ID is invalid", async () => {
        const response = await request(server)
            .put("/products/123")
            .send({ name: "X", price: 1, stock: 1 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
    });

    it("should return '415' when content-type is not valid", async () => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .put(`/products/${id}`)
            .send("name=Test&price=10&stock=45")
            .set("Content-Type", "text/plain");

        expect(response.status).toBe(415);
    });

    it("should return 400 for invalid JSON", async() => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .put(`/products/${id}`)
            .set("Content-Type", "application/json")
            .send("invalid json");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid JSON");
    });

    it("should return 400 for invalid data", async() => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .put(`/products/${id}`)
            .set("Content-Type", "application/json")
            .send({ name: "X", price: "10", stock: 5 });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("ValidationError");
    })

    it("should update the product and return 200", async () => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .put(`/products/${id}`)
            .send({ name: "New", price: 20, stock: 10 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("New");
        expect(response.body.price).toBe(20);
        expect(response.body.stock).toBe(10);
    });
});

describe("Test PATCH /products/:id", () => {
    it("should return 404 when product does not exist", async () => {
        const response = await request(server)
            .patch(`/products/${randomUUID()}`)
            .send({ name: "X", price: 1, stock: 1 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(404);
    });

    it("should return 400 when ID is invalid", async () => {
        const response = await request(server)
            .patch("/products/123")
            .send({ name: "X", price: 1, stock: 1 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
    });

    it("should return '415' when content-type is not valid", async () => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .patch(`/products/${id}`)
            .send("name=Test&price=10&stock=45")
            .set("Content-Type", "text/plain");

        expect(response.status).toBe(415);
    });

    it("should return 400 for invalid JSON", async() => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .patch(`/products/${id}`)
            .set("Content-Type", "application/json")
            .send("invalid json");

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid JSON");
    });

    it("should return 400 for invalid data", async() => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .patch(`/products/${id}`)
            .set("Content-Type", "application/json")
            .send({ name: "X", price: "10", stock: 5 });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("ValidationError");
    })

    it("should update the product and return 200 with a set of parameters", async () => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .patch(`/products/${id}`)
            .send({ name: "New", price: 20, stock: 10 })
            .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("New");
        expect(response.body.price).toBe(20);
        expect(response.body.stock).toBe(10);
    });

    it("should update the product and return 200 with one parameter", async () => {
        const post = await request(server)
            .post("/products")
            .send({ name: "Old", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .patch(`/products/${id}`)
            .send({description: "Descrition updated"})
            .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Old");
        expect(response.body.price).toBe(10);
        expect(response.body.stock).toBe(5);
        expect(response.body.description).toBe("Descrition updated");
    });

});

describe("Test DELETE /products/:id", () => {

    it("should return 404 when product does not exist", async () => {
        const response = await request(server)
            .delete(`/products/${randomUUID()}`)
            .set("Content-Type", "application/json");

        expect(response.status).toBe(404);
    });

    it("should return 400 when ID is invalid", async () => {
        const response = await request(server)
            .delete("/products/123")
            .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
    });

    it("should delete the product and return 204", async () => {
        const post = await request(server)
            .post("/products")
            .send({ name: "ToDelete", price: 10, stock: 5 })
            .set("Content-Type", "application/json");

        const id = post.body.id;

        const response = await request(server)
            .delete(`/products/${id}`)
            .set("Content-Type", "application/json");

        expect(response.status).toBe(204);
        expect(response.body.message).toBeUndefined();

        // Check if the product doesn't exist anymore
        const getResponse = await request(server)
            .get(`/products/${id}`)
            .set("Content-Type", "application/json");

        expect(getResponse.status).toBe(404);
    });
});

