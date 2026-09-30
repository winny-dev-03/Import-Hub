import React, { useEffect } from "react";
import {
  X,
  Store,
  ChevronDown,
  Settings,
  type LucideIcon,
} from "lucide-react";

import {
  mainNavItems,
  accountNavItems,
  type SectionId,
} from "./navConfig";

interface MobileSidebarProps {
  isOpen: boolean;
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  activeSection,
  onNavigate,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigate = (section: SectionId) => {
    onNavigate(section);
    onClose();
  };

  const dashboardItem = mainNavItems.find(
    (item) => item.id === "dashboard"
  );

  const storeItems = mainNavItems.filter(
    (item) =>
      item.id === "products" ||
      item.id === "categories" ||
      item.id === "orders"
  );

  const customerItems = mainNavItems.filter(
    (item) => item.id === "enquiries"
  );

  const renderNavItem = (
    item: {
      id: SectionId;
      label: string;
      icon: LucideIcon;
    }
  ) => {
    const isActive = activeSection === item.id;
    const Icon = item.icon;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavigate(item.id)}
        aria-current={isActive ? "page" : undefined}
        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] transition-all duration-200 ${
          isActive
            ? "bg-[#5B3DF5] font-medium text-white shadow-[0_4px_12px_rgba(91,61,245,0.18)]"
            : "text-[#6B6478] hover:bg-[#F5F2FB] hover:text-[#1C1A24]"
        }`}
      >
        <Icon
          size={18}
          strokeWidth={isActive ? 2.2 : 1.8}
          className={
            isActive
              ? "text-white"
              : "text-[#9E97AD] transition-colors group-hover:text-[#5B3DF5]"
          }
        />

        <span className="flex-1 text-left">
          {item.label}
        </span>

        {item.id === "orders" && (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
              isActive
                ? "bg-white/15 text-white"
                : "bg-[#F0ECF8] text-[#7A7289]"
            }`}
          >
            0
          </span>
        )}

        {item.id === "enquiries" && (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
              isActive
                ? "bg-white/15 text-white"
                : "bg-[#F0ECF8] text-[#7A7289]"
            }`}
          >
            0
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#1C1A24]/40 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-40 flex w-[300px] max-w-[88vw] flex-col bg-white shadow-[8px_0_30px_rgba(28,26,36,0.12)] transition-transform duration-300 ease-out lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#5B3DF5] text-white shadow-[0_4px_12px_rgba(91,61,245,0.18)]">
              <Store size={16} strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-[14px] font-semibold tracking-[-0.02em] text-[#1C1A24]">
                ImportHub
              </p>

              <p className="text-[10px] text-[#8B8498]">
                Business workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B6478] transition-colors hover:bg-[#F5F2FB] hover:text-[#1C1A24]"
          >
            <X size={19} strokeWidth={1.8} />
          </button>
        </div>

        {/* Store switcher */}
        <div className="px-4 pb-5">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-[#E8E3EF] bg-[#FAF9FC] px-3 py-3 text-left transition-colors hover:border-[#D9D1E8] hover:bg-[#F7F5FA]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8DEFF] text-[#5B3DF5]">
              <Store size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-[#1C1A24]">
                My Import Store
              </p>

              <p className="text-[10.5px] text-[#8B8498]">
                Main workspace
              </p>
            </div>

            <ChevronDown
              size={16}
              className="text-[#9E97AD]"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4">
          {/* Home */}
          <div className="mb-6">
            <p className="mb-2 px-2 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#A19AAA]">
              Home
            </p>

            {dashboardItem && renderNavItem(dashboardItem)}
          </div>

          {/* Store */}
          <div className="mb-6">
            <p className="mb-2 px-2 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#A19AAA]">
              Store
            </p>

            <div className="space-y-0.5">
              {storeItems.map(renderNavItem)}
            </div>
          </div>

          {/* Customers */}
          <div>
            <p className="mb-2 px-2 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#A19AAA]">
              Customers
            </p>

            {customerItems.map(renderNavItem)}
          </div>
        </nav>

        {/* Settings */}
        <div className="px-4 pb-3">
          {accountNavItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[14px] transition-all ${
                  isActive
                    ? "bg-[#5B3DF5] font-medium text-white"
                    : "text-[#6B6478] hover:bg-[#F5F2FB] hover:text-[#1C1A24]"
                }`}
              >
                <Settings
                  size={18}
                  strokeWidth={1.8}
                  className={
                    isActive
                      ? "text-white"
                      : "text-[#9E97AD]"
                  }
                />

                {item.label}
              </button>
            );
          })}
        </div>

        {/* Business profile */}
        <div className="border-t border-[#E8E3EF] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E8DEFF] text-[12px] font-semibold text-[#5B3DF5]">
              WA
            </div>

            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-[#1C1A24]">
                Winny Albert
              </p>

              <p className="truncate text-[10.5px] text-[#8B8498]">
                My Import Store
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;