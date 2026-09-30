import React from 'react';
import { Pencil, Trash2, Package } from 'lucide-react';
import type { Category } from '../../../types/categories';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  const isActive = category.status === 'Active';

  return (
    <div className="flex flex-col rounded-xl border border-[#E3DEEA] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14.5px] font-semibold text-[#1C1A24]">{category.name}</h3>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            isActive ? 'bg-green-50 text-green-700' : 'bg-[#F3F1FA] text-[#6B6478]'
          }`}
        >
          {category.status}
        </span>
      </div>

      <p className="mt-2 min-h-[2.5em] text-[13px] leading-relaxed text-[#6B6478]">
        {category.description || 'No description added.'}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-[#E3DEEA] pt-4">
        <div className="flex items-center gap-1.5 text-[12.5px] text-[#6B6478]">
          <Package size={14} strokeWidth={1.7} className="text-[#A9A2B8]" />
          {category.productCount} product{category.productCount === 1 ? '' : 's'}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(category)}
            aria-label={`Edit ${category.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6478] transition-colors hover:bg-[#F3F1FA] hover:text-[#1C1A24]"
          >
            <Pencil size={14} strokeWidth={1.7} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(category)}
            aria-label={`Delete ${category.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6478] transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={14} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;