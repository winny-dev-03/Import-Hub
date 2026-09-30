import React, { useEffect, useRef, useState } from 'react';
import { X, UploadCloud, Trash2 } from 'lucide-react';
import type { Product, ProductInput, ProductAvailability } from '../../../types/product';
import type { Category } from '../../../types/categories';

interface ProductModalProps {
  isOpen: boolean;
  product: Product | null; // null = creating a new product
  categories: Category[];
  onClose: () => void;
  onSubmit: (input: ProductInput) => Promise<void>;
  onGoToCategories: () => void;
}

interface FormErrors {
  name?: string;
  categoryId?: string;
  price?: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  product,
  categories,
  onClose,
  onSubmit,
  onGoToCategories, 
}) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState<ProductAvailability>('Available');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = product !== null;
  const hasCategories = categories.length > 0;

  useEffect(() => {
    if (!isOpen) return;
    setName(product?.name ?? '');
    setCategoryId(product ? String(product.categoryId) : '');
    setDescription(product?.description ?? '');
    setPrice(product ? String(product.price) : '');
    setAvailability(product?.availability ?? 'Available');
    setImageUrl(product?.imageUrl);
    setErrors({});
    setIsSaving(false);
  }, [isOpen, product]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSaving) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isSaving, onClose]);

  if (!isOpen) return null;

  const handleImageSelect = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = 'Product name is required.';
    if (!categoryId) nextErrors.categoryId = 'Select a category.';
    const priceValue = Number(price);
    if (!price.trim() || Number.isNaN(priceValue) || priceValue <= 0) {
      nextErrors.price = 'Enter a valid price.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSubmit({
        name: name.trim(),
        categoryId: Number(categoryId),
        description: description.trim(),
        price: Number(price),
        imageUrl,
        availability,
      });
      setIsSaving(false);
      onClose();
    } catch {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-4">
      <div
        className="absolute inset-0 bg-[#1C1A24]/35"
        onClick={() => !isSaving && onClose()}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? 'Edit product' : 'Add product'}
        className="relative flex max-h-[92vh] w-full flex-col rounded-t-xl bg-white shadow-[0_1px_2px_rgba(28,26,36,0.04),0_16px_32px_rgba(28,26,36,0.12)] sm:max-h-[88vh] sm:max-w-lg sm:rounded-xl"
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#E3DEEA] px-5 py-4">
          <h2 className="text-[15.5px] font-semibold text-[#1C1A24]">
            {isEditing ? 'Edit product' : 'Add product'}
          </h2>
          <button
            type="button"
            onClick={() => !isSaving && onClose()}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6478] transition-colors hover:bg-[#F3F1FA]"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        {!hasCategories ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[14px] font-medium text-[#1C1A24]">Create a category first</p>
            <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-[#6B6478]">
              Products need to belong to a category. Add at least one category before adding your
              first product.
            </p>
            <button
              type="button"
              onClick={() => {
                onGoToCategories();
                onClose();
              }}
              className="mt-5 rounded-lg bg-[#5B3DF5] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#4c32d9]"
            >
              Go to categories
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-5">
            <div>
              <p className="text-[13px] font-medium text-[#453F52]">Product image</p>
              <div className="mt-1.5">
                {imageUrl ? (
                  <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-[#E3DEEA] bg-[#F7F6FA]">
                    <img src={imageUrl} alt="Product preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      aria-label="Remove image"
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-600 shadow-sm transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </div>
                ) : (
                  <label className="flex aspect-[16/9] w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#D6CFE8] bg-[#FAFAFD] text-[#6B6478] transition-colors hover:border-[#5B3DF5]/40 hover:bg-[#F3F1FA]">
                    <UploadCloud size={18} strokeWidth={1.6} />
                    <span className="text-[12.5px]">Click to upload an image</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageSelect(e.target.files?.[0])}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="product-name" className="text-[13px] font-medium text-[#453F52]">
                Product name
              </label>
              <input
                id="product-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                aria-invalid={Boolean(errors.name)}
                className="mt-1.5 h-[44px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                placeholder="e.g. Wireless Earbuds Pro"
              />
              {errors.name && <p className="mt-1.5 text-[12px] text-red-600">{errors.name}</p>}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="product-category" className="text-[13px] font-medium text-[#453F52]">
                  Category
                </label>
                <select
                  id="product-category"
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: undefined }));
                  }}
                  aria-invalid={Boolean(errors.categoryId)}
                  className="mt-1.5 h-[44px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14px] text-[#1C1A24] outline-none transition-colors focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1.5 text-[12px] text-red-600">{errors.categoryId}</p>
                )}
              </div>

              <div>
                <label htmlFor="product-price" className="text-[13px] font-medium text-[#453F52]">
                  Price (₦)
                </label>
                <input
                  id="product-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
                  }}
                  aria-invalid={Boolean(errors.price)}
                  className="mt-1.5 h-[44px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                  placeholder="15000"
                />
                {errors.price && <p className="mt-1.5 text-[12px] text-red-600">{errors.price}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="product-description" className="text-[13px] font-medium text-[#453F52]">
                Description <span className="text-[#A9A2B8]">(optional)</span>
              </label>
              <textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1.5 w-full resize-none rounded-lg border border-[#E3DEEA] bg-white px-3.5 py-2.5 text-[14px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
                placeholder="Describe the product..."
              />
            </div>

            <div className="mt-4">
              <span className="text-[13px] font-medium text-[#453F52]">Availability</span>
              <div className="mt-1.5 flex gap-2">
                {(['Available', 'Unavailable'] as ProductAvailability[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAvailability(option)}
                    className={`rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                      availability === option
                        ? 'border-[#5B3DF5] bg-[#5B3DF5]/[0.08] text-[#5B3DF5]'
                        : 'border-[#E3DEEA] text-[#6B6478] hover:bg-[#F3F1FA]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => !isSaving && onClose()}
                disabled={isSaving}
                className="rounded-lg border border-[#E3DEEA] px-4 py-2.5 text-[13.5px] font-medium text-[#453F52] transition-colors hover:bg-[#F3F1FA] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-[#5B3DF5] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#4c32d9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Add product'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductModal;