"use client";

import { Book, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface SemesterCardProps {
  semesterNumber: number;
  onClick: (semesterNumber: number) => void;
}

export function SemesterCard({ semesterNumber, onClick }: SemesterCardProps) {
  const getIconBySemester = (semester: number) => {
    const icons = [
      <Book key="book" className="h-5 w-5" />,
      <Calendar key="calendar" className="h-5 w-5" />,
      <FileText key="file" className="h-5 w-5" />,
      <Book key="book2" className="h-5 w-5" />,
    ];
    return icons[(semester - 3) % icons.length];
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      onClick={() => onClick(semesterNumber)}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-primary-light/10 p-3 dark:bg-primary-dark/20">
          {getIconBySemester(semesterNumber)}
        </div>
        <span className="text-xl font-bold text-primary dark:text-primary-light">
          {semesterNumber}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        Semester {semesterNumber}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        View syllabus, tests, assignments, and study materials
      </p>
    </motion.div>
  );
}
