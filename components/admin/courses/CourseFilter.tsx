"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { courses } from "@/lib/mock-data";

interface CourseFilterProps {
  onFilterChange: (search: string, department: string) => void;
}

export function CourseFilter({ onFilterChange }: CourseFilterProps) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onFilterChange(search, department);
  }, [search, department, onFilterChange]);

  const clearFilters = () => {
    setSearch("");
    setDepartment("All Departments");
  };

  const isFiltered = search !== "" || department !== "All Departments";

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus-visible:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {isFiltered && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {(search ? 1 : 0) + (department !== "All Departments" ? 1 : 0)}
            </span>
          )}
        </button>
        {isFiltered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={clearFilters}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 overflow-hidden rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm outline-none focus-visible:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                {
                  //@ts-ignore
                  courses.department.map((dept: any) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))
                }
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
