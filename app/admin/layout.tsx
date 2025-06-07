"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user, loading } = useAdminAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center mt-10">loading...</div>
    );
  if (!user) return null; // ⛔ Prevent rendering too early

  return (
    <div className="min-h-screen bg-gray-100 pt-8">
      <AdminSidebar />

      <div className="ml-20 md:ml-16 lg:ml-64 transition-all duration-300">
        <AdminTopbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 md:p-6 pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
