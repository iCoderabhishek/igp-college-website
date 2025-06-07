"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Building,
  Building2,
  FileText,
  Lightbulb,
} from "lucide-react";
import { title } from "node:process";

const links = [
  {
    title: "Courses",
    description: "Explore our diploma engineering programs",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    href: "/admin/courses",
  },
  {
    title: "Departments",
    description: "Meet our academic departments",
    icon: <Building2 className="h-8 w-8 text-primary" />,
    href: "/admin/departments",
  },
  {
    title: "Faculty",
    description: "Meet our academic faculty",
    icon: <Building className="h-8 w-8 text-primary" />,
    href: "/admin/faculty",
  },
  {
    title: "Notices",
    description: "Stay updated with important announcements",
    icon: <FileText className="h-8 w-8 text-primary" />,
    href: "/admin/notices",
  },
  {
    title: "Projects",
    description: "Student innovations and achievements",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    href: "/admin/projects",
  },
];

export default function QuickLinks() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">
        Popular Pages
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, backgroundColor: "#f8f9ff" }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded-lg p-4 hover:border-primary/30"
          >
            <Link href={link.href} className="flex flex-col h-full">
              <div className="mb-3">{link.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{link.title}</h3>
              <p className="text-gray-600 text-sm mt-auto">
                {link.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
