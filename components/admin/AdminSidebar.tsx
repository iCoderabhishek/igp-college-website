"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  BookOpen,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Library,
  UserCog,
  School,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/admin",
  },
  {
    name: "Notices",
    icon: <FileText />,
    href: "/admin/notices",
  },
  {
    name: "Projects",
    icon: <Users />,
    href: "/admin/projects",
  },
  {
    name: "Courses",
    icon: <GraduationCap />,
    href: "/admin/courses",
  },
  {
    name: "Faculty",
    icon: <UserCog />,
    href: "/admin/faculty",
  },
  {
    name: "Departments",
    icon: <School />,
    href: "/admin/departments",
  },
  {
    name: "Study Materials",
    icon: <Library />,
    href: "/admin/study-materials",
  },
  {
    name: "Contact Messages",
    icon: <MessageSquare />,
    href: "/admin/contacts",
  },
  {
    name: "Settings",
    icon: <Settings />,
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle screen size for large screen logic
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showFullSidebar = isLargeScreen || isOpen;

  return (
    <>
      <div
        className={`fixed left-0 top-0 max-h-screen bg-transparent bg-opacity-20 border-r border-gray-200 z-20 mt-[70px] transition-all duration-300
          ${isLargeScreen ? "w-64" : isOpen ? "w-56 md:w-56" : "w-20 md:w-20"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link href="/admin" className="flex items-center">
            <BookOpen className="h-8 w-8 text-primary" />
            {showFullSidebar && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="ml-2 font-semibold text-gray-800 whitespace-nowrap overflow-hidden"
              >
                ITA Admin
              </motion.span>
            )}
          </Link>

          {/* Toggle only on small/medium screens */}
          {!isLargeScreen && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <ChevronLeft className="h-6 w-6 text-gray-500" />
              ) : (
                <ChevronRight className="h-6 w-6 text-gray-500" />
              )}
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center ${
                      !showFullSidebar ? "justify-center" : "px-3"
                    } py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:text-primary hover:font-semibold hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {React.cloneElement(item.icon, {
                        className: `h-6 w-6 ${
                          showFullSidebar ? "" : "mx-auto"
                        }`,
                      })}
                    </div>
                    {showFullSidebar && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3 whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && !isLargeScreen && (
        <div
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
