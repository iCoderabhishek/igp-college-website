"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import { redirect } from "next/navigation";

interface AdminTopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminTopbar({
  sidebarOpen,
  setSidebarOpen,
}: AdminTopbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // // Clear all relevant localStorage items (you can be specific if needed)
    // localStorage.removeItem("token"); // or any specific key you're using
    // localStorage.removeItem("user"); // example, adjust based on your storage keys

    // Optionally, clear all of localStorage
    localStorage.clear();

    // Optionally, clear sessionStorage or cookies if used
    // sessionStorage.clear();
    // document.cookie = "your_cookie_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page
    redirect("/login");
  };

  return (
    <header
      className={`top-0 right-0 z-auto h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 transition-all duration-300 fixed w-full ${
        sidebarOpen
          ? "sm:pl-20 md:pl-20 lg:pl-64"
          : "sm:pl-20 md:pl-20 lg:pl-20"
      }`}
    >
      <div className="flex items-center justify-evenly gap-5">
        {/* Mobile Menu Button */}

        {/* Page Title - Only shown on larger screens */}
        <h1 className=" text-lg font-semibold text-gray-800 hidden sm:block"></h1>
        <h1 className="text-lg font-semibold text-gray-800 hover:text-primary hidden sm:block">
          <a href="/">Go to Home </a>
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-1 sm:space-x-4">
        {/* Notifications */}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-expanded={showProfileMenu}
            aria-haspopup="true"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-300">
              <img
                src="/ita-icon.png"
                alt="Admin"
                className="object-cover w-full h-full"
              />
            </div>

            {/* User info - hidden on small screens */}
            <div className="hidden md:flex items-center">
              <div className="text-left mr-1">
                <p className="text-sm font-medium text-gray-700 line-clamp-1">
                  ITA Admin
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  admin@itahargpoly.edu.in
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
