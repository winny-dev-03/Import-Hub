import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Category } from '../../../types/categories';

interface DeleteCategoryModalProps {
  category: Category | null;
  onCancel: () => void;
  onConfirm: (id: number) => Promise<void>;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ category, onCancel, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!category) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(category.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-[#1C1A24]/35"
        onClick={() => !isDeleting && onCancel()}
        aria-hidden="true"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(28,26,36,0.04),0_16px_32px_rgba(28,26,36,0.12)]"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={16} strokeWidth={1.8} />
          </span>
          <div>
            <h2 id="delete-category-title" className="text-[15px] font-semibold text-[#1C1A24]">
              Delete "{category.name}"?
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B6478]">
              This will permanently remove this category. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => !isDeleting && onCancel()}
            disabled={isDeleting}
            className="rounded-lg border border-[#E3DEEA] px-4 py-2.5 text-[13.5px] font-medium text-[#453F52] transition-colors hover:bg-[#F3F1FA] disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting…' : 'Delete category'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;