"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, BookOpen, Users } from "lucide-react";
import EditCourses from "@/components/courses/EditCourses";
import { toast } from "sonner";
import EditCourse from "@/components/courses/EditCourses";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      console.log(data);
      setCourses(data.courses); // ← updated
    } catch (error) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      console.log(data);
      setCourses(data.courses); // ← updated
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (!confirmDelete) return;
      await fetch(`/api/courses/${id}`, { method: "DELETE" });
      toast.success("Course deleted");
      fetchAllCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Course Management
          </h1>
          <p className="text-gray-600">
            Manage diploma programs and their details
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Course
        </button>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/40">
          <EditCourses
            onClose={() => setShowAddModal(false)}
            getAllCourses={fetchAllCourses}
            showToastMessage={(msg) => toast.success(msg)}
          />
        </div>
      )}

      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center p-4">
          <EditCourse
            onClose={() => setShowEditModal(false)}
            showToastMessage={(msg) => toast(msg)} // if you're using react-hot-toast or similar
            getAllCourses={fetchCourses} // refresh course list after edit
            CourseData={selectedCourse}
            type="edit"
          />
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            Loading courses...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 py-10">
            {error}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No courses found.
          </div>
        ) : (
          filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {course.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Department: {course.department}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowEditModal(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    onClick={() => handleDelete(course.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-600">
                    {course.totalIntake} seats
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <h4 className="font-medium text-gray-800 mb-1">
                  Course Coordinator(s)
                </h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {course.coordinator?.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {course.link && (
                <a
                  href={course.link}
                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  target="_blank"
                >
                  Visit Course Page
                </a>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
