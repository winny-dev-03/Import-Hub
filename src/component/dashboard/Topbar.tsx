import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  ArrowUpRight,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

interface StoredUser {
  fullName: string;
  businessName: string;
  email: string;
}

const Topbar: React.FC<TopbarProps> = ({
  title,
  onMenuClick,
}) => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("importhub_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("importhub_user");
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("importhub_user");
    setAccountOpen(false);

    window.location.href = "/login";
  };

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "WA";

  return (
    <header className="sticky top-0 z-20 border-b border-[#E8E3EF] bg-white">
      <div className="flex min-h-[68px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[#6B6478] transition-colors hover:bg-[#F5F2FB] hover:text-[#1C1A24] lg:hidden"
          >
            <Menu size={19} strokeWidth={1.8} />
          </button>

          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#F1EDFF] text-[#5B3DF5]">
              <LayoutDashboard size={16} strokeWidth={1.9} />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-[19px] font-semibold tracking-[-0.025em] text-[#1C1A24] sm:text-[21px]">
                {title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#"
            className="group hidden h-9 items-center gap-1.5 rounded-xl px-2.5 text-[12px] font-medium text-[#5B3DF5] transition-colors hover:bg-[#F5F2FB] sm:flex"
          >
            View store

            <ArrowUpRight
              size={13}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <div className="hidden h-7 w-px bg-[#E8E3EF] sm:block" />

          {/* Account */}
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((open) => !open)}
              aria-expanded={accountOpen}
              aria-label="Open account menu"
              className="group flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition-colors hover:bg-[#F7F5FA]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8DEFF] text-[11px] font-semibold text-[#5B3DF5]">
                {initials}
              </div>

              <div className="hidden text-left md:block">
                <p className="max-w-[120px] truncate text-[12px] font-medium leading-none text-[#1C1A24]">
                  {user?.fullName || "Winny Albert"}
                </p>

                <p className="mt-1 text-[10px] leading-none text-[#8B8498]">
                  Admin
                </p>
              </div>

              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`hidden text-[#9E97AD] transition-transform md:block ${
                  accountOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {accountOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] overflow-hidden rounded-2xl border border-[#E6E1EC] bg-white p-1.5 shadow-[0_14px_35px_rgba(28,26,36,0.12)]">
                <div className="border-b border-[#EEEAF2] px-3 py-2.5">
                  <p className="truncate text-[12.5px] font-medium text-[#1C1A24]">
                    {user?.fullName || "Winny Albert"}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-[#8B8498]">
                    {user?.email || "Admin account"}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[12.5px] text-[#6B6478] transition-colors hover:bg-[#F7F5FA] hover:text-[#1C1A24]"
                >
                  <User size={15} strokeWidth={1.8} />
                  Account
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[12.5px] text-[#C44B5D] transition-colors hover:bg-[#FFF3F5]"
                >
                  <LogOut size={15} strokeWidth={1.8} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

