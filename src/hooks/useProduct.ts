import { useCallback, useRef, useState } from 'react';
import type { Product, ProductInput } from '../types/product';

const simulateLatency = () => new Promise<void>((resolve) => setTimeout(resolve, 400));

/**
 * Local, in-memory product store — starts empty, no fake products.
 *
 * Swap the body of addProduct/updateProduct/deleteProduct for real API
 * calls once the Express + PostgreSQL backend exists:
 *   POST   /api/products
 *   GET    /api/products
 *   PUT    /api/products/:id
 *   DELETE /api/products/:id
 * The shape this hook returns — `products`, `addProduct`, `updateProduct`,
 * `deleteProduct` — is designed to stay the same, so ProductsSection won't
 * need to change when that happens.
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const nextId = useRef(1);

  const addProduct = useCallback(async (input: ProductInput): Promise<void> => {
    await simulateLatency();
    const newProduct: Product = {
      id: nextId.current++,
      name: input.name.trim(),
      categoryId: input.categoryId,
      description: input.description.trim(),
      price: input.price,
      imageUrl: input.imageUrl,
      availability: input.availability,
    };
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback(async (id: number, input: ProductInput): Promise<void> => {
    await simulateLatency();
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: input.name.trim(),
              categoryId: input.categoryId,
              description: input.description.trim(),
              price: input.price,
              imageUrl: input.imageUrl,
              availability: input.availability,
            }
          : p
      )
    );
  }, []);

  const deleteProduct = useCallback(async (id: number): Promise<void> => {
    await simulateLatency();
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { products, addProduct, updateProduct, deleteProduct };
};