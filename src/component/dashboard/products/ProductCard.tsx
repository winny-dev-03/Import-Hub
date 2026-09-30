import React from 'react';
import { Pencil, Trash2, ImageOff } from 'lucide-react';
import type { Product } from '../../../types/product';
import type { Category } from '../../../types/categories';
import { formatNaira } from '../../../utils/cureency';

interface ProductCardProps {
  product: Product;
  category: Category | undefined;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category, onEdit, onDelete }) => {
  const isAvailable = product.availability === 'Available';

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[#E3DEEA] bg-white">
      <div className="flex aspect-[4/3] items-center justify-center bg-[#F7F6FA]">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <ImageOff size={20} strokeWidth={1.6} className="text-[#A9A2B8]" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[14px] font-semibold leading-snug text-[#1C1A24]">{product.name}</h3>
          <span
            className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
              isAvailable ? 'bg-green-50 text-green-700' : 'bg-[#F3F1FA] text-[#6B6478]'
            }`}
          >
            {product.availability}
          </span>
        </div>

        <p className="mt-1 text-[12.5px] text-[#6B6478]">
          {category ? category.name : 'Uncategorised'}
        </p>

        <p className="mt-2 text-[15px] font-semibold text-[#1C1A24]">{formatNaira(product.price)}</p>

        <div className="mt-4 flex items-center justify-end gap-1 border-t border-[#E3DEEA] pt-3">
          <button
            type="button"
            onClick={() => onEdit(product)}
            aria-label={`Edit ${product.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6478] transition-colors hover:bg-[#F3F1FA] hover:text-[#1C1A24]"
          >
            <Pencil size={14} strokeWidth={1.7} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(product)}
            aria-label={`Delete ${product.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6478] transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={14} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;