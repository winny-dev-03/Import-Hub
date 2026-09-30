import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Category, CategoryInput, CategoryStatus } from '../../../types/categories';

interface CategoryModalProps {
  isOpen: boolean;
  category: Category | null; // null = creating a new category
  onClose: () => void;
  onSubmit: (input: CategoryInput) => Promise<void>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, category, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<CategoryStatus>('Active');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = category !== null;

  useEffect(() => {
    if (!isOpen) return;
    setName(category?.name ?? '');
    setDescription(category?.description ?? '');
    setStatus(category?.status ?? 'Active');
    setError(null);
    setIsSaving(false);
  }, [isOpen, category]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSaving) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isSaving, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }
    setError(null);
    setIsSaving(true);
    try {
      await onSubmit({ name: name.trim(), description: description.trim(), status });
      setIsSaving(false);
      onClose();
    } catch {
      setIsSaving(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[#1C1A24]/35"
        onClick={() => !isSaving && onClose()}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? 'Edit category' : 'Add category'}
        className="relative w-full max-w-md rounded-xl bg-white shadow-[0_1px_2px_rgba(28,26,36,0.04),0_16px_32px_rgba(28,26,36,0.12)]"
      >
        <div className="flex items-center justify-between border-b border-[#E3DEEA] px-5 py-4">
          <h2 className="text-[15.5px] font-semibold text-[#1C1A24]">
            {isEditing ? 'Edit category' : 'Add category'}
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

        <form onSubmit={handleSubmit} className="px-5 py-5">
          <div>
            <label htmlFor="category-name" className="text-[13px] font-medium text-[#453F52]">
              Category name
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={Boolean(error)}
              className="mt-1.5 h-[44px] w-full rounded-lg border border-[#E3DEEA] bg-white px-3.5 text-[14px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
              placeholder="e.g. Kitchen Appliances"
            />
            {error && <p className="mt-1.5 text-[12px] text-red-600">{error}</p>}
          </div>

          <div className="mt-4">
            <label htmlFor="category-description" className="text-[13px] font-medium text-[#453F52]">
              Description <span className="text-[#A9A2B8]">(optional)</span>
            </label>
            <textarea
              id="category-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-lg border border-[#E3DEEA] bg-white px-3.5 py-2.5 text-[14px] text-[#1C1A24] outline-none transition-colors placeholder:text-[#A9A2B8] focus:border-[#5B3DF5] focus:ring-[3px] focus:ring-[#5B3DF5]/15"
              placeholder="What kind of products belong here?"
            />
          </div>

          <div className="mt-4">
            <span className="text-[13px] font-medium text-[#453F52]">Status</span>
            <div className="mt-1.5 flex gap-2">
              {(['Active', 'Inactive'] as CategoryStatus[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={`rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    status === option
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
              {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Create category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;