import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import type { Category, CategoryInput } from '../../../types/categories';
import CategoryCard from './CategoryCard';
import CategoryModal from './CategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import EmptyState from '../EmptyState';

interface CategoriesSectionProps {
  categories: Category[];
  onAddCategory: (input: CategoryInput) => Promise<void>;
  onUpdateCategory: (id: number, input: CategoryInput) => Promise<void>;
  onDeleteCategory: (id: number) => Promise<void>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const openAddModal = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleSubmit = async (input: CategoryInput) => {
    if (editingCategory) {
      await onUpdateCategory(editingCategory.id, input);
    } else {
      await onAddCategory(input);
    }
  };

  const handleConfirmDelete = async (id: number) => {
    await onDeleteCategory(id);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[1.15rem] font-semibold text-[#1C1A24]">Categories</h2>
          <p className="mt-1 text-[13.5px] text-[#6B6478]">Organise the products in your import store.</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-[#5B3DF5] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#4c32d9] sm:flex-shrink-0"
        >
          <Plus size={15} strokeWidth={2} />
          Add category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Tag}
            title="No categories yet"
            description="Categories help organise your products so customers can browse your store with ease."
            action={{ label: 'Add category', onClick: openAddModal }}
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={modalOpen}
        category={editingCategory}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteCategoryModal
        category={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CategoriesSection;