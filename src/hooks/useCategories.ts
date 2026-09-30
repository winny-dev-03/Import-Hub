import { useCallback, useRef, useState } from 'react';
import type { Category, CategoryInput } from '../types/categories';

const simulateLatency = () => new Promise<void>((resolve) => setTimeout(resolve, 400));

/**
 * Local, in-memory category store for now — starts empty, no fake data.
 *
 * Swap the body of addCategory/updateCategory/deleteCategory for real API
 * calls (e.g. `fetch('/api/categories', { method: 'POST', ... })`) once a
 * backend exists. The shape this hook returns — `categories`,
 * `addCategory`, `updateCategory`, `deleteCategory` — is designed to stay
 * the same, so nothing that calls this hook needs to change later.
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const nextId = useRef(1);

  const addCategory = useCallback(async (input: CategoryInput): Promise<void> => {
    await simulateLatency();
    const newCategory: Category = {
      id: nextId.current++,
      name: input.name.trim(),
      description: input.description.trim(),
      productCount: 0,
      status: input.status,
    };
    setCategories((prev) => [newCategory, ...prev]);
  }, []);

  const updateCategory = useCallback(async (id: number, input: CategoryInput): Promise<void> => {
    await simulateLatency();
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, name: input.name.trim(), description: input.description.trim(), status: input.status }
          : c
      )
    );
  }, []);

  const deleteCategory = useCallback(async (id: number): Promise<void> => {
    await simulateLatency();
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { categories, addCategory, updateCategory, deleteCategory };
};