export type CategoryStatus = 'Active' | 'Inactive';

export interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  status: CategoryStatus;
}

// What the create/edit form collects. Kept separate from `Category` since
// id and productCount aren't user-editable — id is assigned on create,
// productCount is derived from actual product assignments (not built yet).
export interface CategoryInput {
  name: string;
  description: string;
  status: CategoryStatus;
}