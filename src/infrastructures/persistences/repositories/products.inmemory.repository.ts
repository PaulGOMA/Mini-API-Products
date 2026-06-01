import type { Product } from "../../../models/index.ts";
import { InMemoryRepository } from "../../../repositories/inmemory.repository.ts";

export const productStorage = new InMemoryRepository<Product>();