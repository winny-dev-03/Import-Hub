import type { LucideIcon } from "lucide-react";
import {
  Grid2X2,
  Package,
  Tags,
  MessageSquare,
  ShoppingBag,
  Settings,
} from "lucide-react";

export type SectionId =
  | "dashboard"
  | "products"
  | "categories"
  | "enquiries"
  | "orders"
  | "settings";

export interface NavItem {
  id: SectionId;
  label: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Grid2X2,
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
  },
  {
    id: "categories",
    label: "Categories",
    icon: Tags,
  },
  {
    id: "enquiries",
    label: "Enquiries",
    icon: MessageSquare,
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
  },
];

export const accountNavItems: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export const sectionMeta: Record<
  SectionId,
  { title: string; description: string }
> = {
  dashboard: {
    title: "Dashboard",
    description: "An overview of your import business.",
  },
  products: {
    title: "Products",
    description: "Manage the products you import and sell.",
  },
  categories: {
    title: "Categories",
    description: "Organize your products into categories.",
  },
  enquiries: {
    title: "Enquiries",
    description: "Questions and messages from customers.",
  },
  orders: {
    title: "Orders",
    description: "Track and manage customer orders.",
  },
  settings: {
    title: "Settings",
    description: "Business profile and account preferences.",
  },
};