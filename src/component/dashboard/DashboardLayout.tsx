import React, { useState } from "react";
import Sidebar from "./SideBar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";
import type { SectionId } from "./navConfig";

interface DashboardLayoutProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  title: string;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeSection,
  onNavigate,
  title,
  children,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F6FA]">
      {/* Desktop sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={onNavigate}
      />

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={mobileNavOpen}
        activeSection={activeSection}
        onNavigate={onNavigate}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main application area */}
      <div className="flex min-h-screen flex-col lg:ml-[248px]">
        <Topbar
          title={title}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;