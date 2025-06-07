"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Users, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/lib/mock-data";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {course.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary dark:text-primary-light">
              {course.department}
            </p>
          </div>
          <div className="flex -space-x-2">
            {course.coordinators.slice(0, 3).map((coordinator: any, index) => (
              <div
                key={index}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-white ring-2 ring-white dark:ring-gray-800`}
              >
                {coordinator
                  .split(" ")
                  .map((name: any) => name[0])
                  .join("")}
              </div>
            ))}
            {course.coordinators.length > 3 && (
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-white ring-2 ring-white dark:ring-gray-800">
                +{course.coordinators.length - 3}
              </div>
            )}
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="mr-1.5 h-4 w-4" />
          <span>Intake: {course.intake} students</span>
        </div>
      </div>

      <motion.div
        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 px-5 py-3"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(course)}
            className="inline-flex items-center rounded px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <Edit className="mr-1 h-3.5 w-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(course)}
            className="inline-flex items-center rounded px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <Trash2 className="mr-1 h-3.5 w-3.5" />
            Delete
          </button>
        </div>
        <Link
          href={`/admin/courses/${course.slug}`}
          className="inline-flex items-center rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary-light/10 dark:text-primary-light dark:hover:bg-primary-light/20"
        >
          <span className="mr-1">View</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
