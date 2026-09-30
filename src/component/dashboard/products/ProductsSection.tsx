import React, { useState } from 'react';
import { Plus, PackageSearch } from 'lucide-react';
import type { Product, ProductInput } from '../../../types/product';
import type { Category } from '../../../types/categories';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import DeleteProductModal from './DeleteProductModal';

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  onAddProduct: (input: ProductInput) => Promise<void>;
  onUpdateProduct: (id: number, input: ProductInput) => Promise<void>;
  onDeleteProduct: (id: number) => Promise<void>;
  onGoToCategories: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onGoToCategories,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const openAddModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (input: ProductInput) => {
    if (editingProduct) {
      await onUpdateProduct(editingProduct.id, input);
    } else {
      await onAddProduct(input);
    }
  };

  const handleConfirmDelete = async (id: number) => {
    await onDeleteProduct(id);
    setDeleteTarget(null);
  };

  const categoryById = (id: number) =>
    categories.find((category) => category.id === id);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-[#1C1A24]">
            Products
          </h2>

          <p className="mt-1 text-[13.5px] text-[#6B6478]">
            Manage the products available in your import store.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex w-fit items-center justify-center gap-1.5 rounded-xl bg-[#5B3DF5] px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_5px_14px_rgba(91,61,245,0.14)] transition-all duration-200 hover:bg-[#4c32d9] hover:shadow-[0_7px_18px_rgba(91,61,245,0.18)] sm:flex-shrink-0"
        >
          <Plus size={15} strokeWidth={2} />
          Add product
        </button>
      </div>

      {/* Empty state */}
      {products.length === 0 ? (
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#E6E1EC] bg-white">
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#E4DDF4] bg-[#F5F2FF] text-[#5B3DF5]">
              <PackageSearch size={21} strokeWidth={1.7} />
            </div>

            <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#1C1A24]">
              Your product catalogue is ready
            </h3>

            <p className="mt-2 max-w-[390px] text-[12.5px] leading-6 text-[#8B8498]">
              Add products as you source them from your suppliers. They’ll
              appear here and on your storefront once they’re added.
            </p>

            <div className="mt-7 h-px w-12 bg-[#E8E3EF]" />

            <p className="mt-4 text-[11.5px] text-[#A19AAA]">
              Use <span className="font-medium text-[#6B6478]">Add product</span>{' '}
              above to get started.
            </p>
          </div>
        </div>
      ) : (
        /* Product grid */
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={categoryById(product.categoryId)}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* Product modal */}
      <ProductModal
        isOpen={modalOpen}
        product={editingProduct}
        categories={categories}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        onGoToCategories={onGoToCategories}
      />

      {/* Delete confirmation */}
      <DeleteProductModal
        product={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductsSection;

