import React from "react";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-[#E3DEEA] px-6 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F1FA] text-[#A9A2B8]">
        <Icon size={20} strokeWidth={1.8} />
      </span>

      <p className="mt-4 text-[14.5px] font-medium text-[#1C1A24]">
        {title}
      </p>

      <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-[#6B6478]">
        {description}
      </p>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-5 rounded-lg bg-[#5B3DF5] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#4c32d9]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;