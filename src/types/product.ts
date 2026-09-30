export type ProductAvailability = 'Available' | 'Unavailable';

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  price: number;
  imageUrl?: string;
  availability: ProductAvailability;
}

// What the create/edit form collects. `imageUrl` here is a local preview
// (data URL) until real image hosting exists on the backend.
export interface ProductInput {
  name: string;
  categoryId: number;
  description: string;
  price: number;
  imageUrl?: string;
  availability: ProductAvailability;
}