import React, { useState } from "react";
import DashboardLayout from "../component/dashboard/DashboardLayout";
import StatCard from "../component/dashboard/StatCard";
import EmptyState from "../component/dashboard/EmptyState";
import CategoriesSection from "../component/dashboard/categories/CategoriesSection";
import ProductsSection from "../component/dashboard/products/ProductsSection";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProduct";
import {
  sectionMeta,
  type SectionId,
} from "../component/dashboard/navConfig";
import {
  Package,
  Tags,
  MessageSquare,
  ShoppingBag,
  Inbox,
  Construction,
  Plus,
} from "lucide-react";

interface DashboardOverviewProps {
  onNavigate: (section: SectionId) => void;
  productCount: number;
  categoryCount: number;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  productCount,
  categoryCount,
}) => {
  return (
    <div className="space-y-7">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[12px] font-medium text-[#8B8498]">
            {getGreeting()}, Winny
          </p>

          <h2 className="text-[25px] font-semibold tracking-[-0.035em] text-[#1C1A24] sm:text-[28px]">
            Store overview
          </h2>

          <p className="mt-1.5 text-[13px] text-[#6B6478]">
            Keep track of your products, customers and orders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("products")}
          className="group inline-flex w-fit items-center gap-2 rounded-xl bg-[#5B3DF5] px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_5px_14px_rgba(91,61,245,0.16)] transition-all duration-200 hover:bg-[#4c32d9] hover:shadow-[0_7px_18px_rgba(91,61,245,0.2)]"
        >
          <Plus size={16} />
          Add product
        </button>
      </section>

      <section className="grid grid-cols-2 gap-3.5 xl:grid-cols-4">
        <StatCard
          label="Products"
          value={productCount}
          icon={Package}
        />

        <StatCard
          label="Categories"
          value={categoryCount}
          icon={Tags}
        />

        <StatCard
          label="Enquiries"
          value={0}
          icon={MessageSquare}
        />

        <StatCard
          label="Orders"
          value={0}
          icon={ShoppingBag}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-[#E6E1EC] bg-white">
          <div className="flex items-center justify-between border-b border-[#EEEAF2] px-5 py-4">
            <div>
              <h3 className="text-[14px] font-semibold text-[#1C1A24]">
                Store activity
              </h3>

              <p className="mt-0.5 text-[11.5px] text-[#8B8498]">
                A quick look at activity across your store
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate("orders")}
              className="group flex items-center gap-1 text-[11.5px] font-medium text-[#5B3DF5]"
            >
              View orders
              <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </button>
          </div>

          <div className="flex min-h-[260px] items-center justify-center px-6 py-10">
            <div className="max-w-[280px] text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1EDFF] text-[#5B3DF5]">
                <Inbox size={20} />
              </div>

              <h4 className="text-[13.5px] font-medium text-[#1C1A24]">
                Your store is ready
              </h4>

              <p className="mt-1.5 text-[12px] leading-relaxed text-[#8B8498]">
                Product activity, orders and customer activity will appear
                here as your store starts receiving data.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E6E1EC] bg-white">
          <div className="border-b border-[#EEEAF2] px-5 py-4">
            <h3 className="text-[14px] font-semibold text-[#1C1A24]">
              Quick actions
            </h3>

            <p className="mt-0.5 text-[11.5px] text-[#8B8498]">
              Common store management tasks
            </p>
          </div>

          <div className="p-3">
            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-[#F8F6FC]"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#F1EDFF] text-[#5B3DF5]">
                <Package size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium text-[#1C1A24]">
                  Add a product
                </p>

                <p className="mt-0.5 text-[11px] text-[#8B8498]">
                  Add products to your store
                </p>
              </div>

              <span className="text-[15px] text-[#B0A9BB] transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("categories")}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-[#F8F6FC]"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F3FF] text-[#5B3DF5]">
                <Tags size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium text-[#1C1A24]">
                  Create a category
                </p>

                <p className="mt-0.5 text-[11px] text-[#8B8498]">
                  Organize your products
                </p>
              </div>

              <span className="text-[15px] text-[#B0A9BB] transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("enquiries")}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-[#F8F6FC]"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#F7F3FF] text-[#5B3DF5]">
                <MessageSquare size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-medium text-[#1C1A24]">
                  View enquiries
                </p>

                <p className="mt-0.5 text-[11px] text-[#8B8498]">
                  Respond to customer questions
                </p>
              </div>

              <span className="text-[15px] text-[#B0A9BB] transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-[#1C1A24]">
              Recent enquiries
            </h3>

            <p className="mt-0.5 text-[11.5px] text-[#8B8498]">
              Customer questions and product enquiries
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("enquiries")}
            className="text-[11.5px] font-medium text-[#5B3DF5] hover:underline"
          >
            View all
          </button>
        </div>

        <EmptyState
          icon={MessageSquare}
          title="No enquiries yet"
          description="Customer enquiries will appear here when they start coming in."
        />
      </section>
    </div>
  );
};

const SectionPlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <EmptyState
    icon={Construction}
    title={`${label} is on its way`}
    description={`${label} management isn't built yet — it'll appear here once that part of the dashboard is ready.`}
  />
);

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] =
    useState<SectionId>("dashboard");

  const meta = sectionMeta[activeSection];

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  return (
    <DashboardLayout
      activeSection={activeSection}
      onNavigate={setActiveSection}
      title={meta.title}
    >
      {activeSection === "dashboard" && (
        <DashboardOverview
          onNavigate={setActiveSection}
          productCount={products.length}
          categoryCount={categories.length}
        />
      )}

      {activeSection === "products" && (
        <ProductsSection
          products={products}
          categories={categories}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onGoToCategories={() => setActiveSection("categories")}
        />
      )}

      {activeSection === "categories" && (
        <CategoriesSection
          categories={categories}
          onAddCategory={addCategory}
          onUpdateCategory={updateCategory}
          onDeleteCategory={deleteCategory}
        />
      )}

      {activeSection !== "dashboard" &&
        activeSection !== "products" &&
        activeSection !== "categories" && (
          <SectionPlaceholder
            label={sectionMeta[activeSection].title}
          />
        )}
    </DashboardLayout>
  );
};

export default Dashboard;