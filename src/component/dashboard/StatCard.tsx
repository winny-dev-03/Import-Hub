import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#E7E2EE] bg-white px-5 py-5 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#D8D0E4] hover:shadow-[0_8px_24px_rgba(28,26,36,0.06)]">
      {/* Subtle accent */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[#5B3DF5] opacity-80" />

      <div className="flex items-center justify-between">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#91899F]">
          {label}
        </p>

        <Icon
          size={16}
          strokeWidth={1.7}
          className="text-[#B0A8BB] transition-colors duration-200 group-hover:text-[#5B3DF5]"
        />
      </div>

      <div className="mt-5 flex items-end justify-between">
        <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-[#1C1A24]">
          {value}
        </p>

        <span className="mb-0.5 text-[10.5px] text-[#A19AAA]">
          total
        </span>
      </div>
    </div>
  );
};

export default StatCard;

