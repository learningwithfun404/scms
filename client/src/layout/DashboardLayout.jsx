import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/shared/Sidebar";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open, isMobile]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 fixed top-0 left-0 h-full z-30">
        <Sidebar setOpen={setOpen} isMobile={false} />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <>
          {/* Backdrop/Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden fade-in"
            onClick={() => setOpen(false)}
          />
          {/* Mobile Sidebar */}
          <div
            className={`lg:hidden fixed top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar setOpen={setOpen} isMobile={true} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:ml-72 transition-all duration-300">
        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 ">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                A
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
