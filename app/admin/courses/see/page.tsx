"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, School, FileText, Users, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { academicSessions, Course, courses } from "@/lib/mock-data";

import { PageHeader } from "@/components/admin/PageHeader";
import { SemesterCard } from "@/components/admin/courses/SemesterCard";
import { SemesterModal } from "@/components/admin/courses/SemesterModal";
import { AnimationContainer } from "@/components/ui/animation-container";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseName = params.course_name as string | any;

  const [courseDetails, setCourseDetails] = useState<Course | any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [isSemesterModalOpen, setIsSemesterModalOpen] = useState(false);
  const [academicSession, setAcademicSession] = useState(academicSessions[0]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // In a real app, this would be a fetch call to the API
        // const response = await fetch(`/api/courses/${courseName}`);
        // const data = await response.json();

        setTimeout(() => {
          const data = courses[courseName];
          if (data) {
            setCourseDetails(data);
          } else {
            setError("Course not found");
          }
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setError("Failed to load course details");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseName]);

  const handleSemesterClick = (semesterNumber: number) => {
    setSelectedSemester(semesterNumber);
    setIsSemesterModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary/70" />
      </div>
    );
  }

  if (error || !courseDetails) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <FileText className="h-10 w-10 text-red-600 dark:text-red-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {error || "Course not found"}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          The requested course could not be found or loaded.
        </p>
        <Link
          href="/admin/courses"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <AnimationContainer>
      <>
        <Link
          href="/admin/courses"
          className="mb-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Courses
        </Link>
      </>

      <PageHeader
        title={courseDetails.title}
        description={`${courseDetails.department} | Intake: ${courseDetails.intake} students`}
        actions={
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Academic Session:
            </label>
            <select
              value={academicSession}
              onChange={(e) => setAcademicSession(e.target.value)}
              className="rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {academicSessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light/10 dark:bg-primary-dark/20">
              <School className="h-6 w-6 text-primary dark:text-primary-light" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Department
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {courseDetails.department}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light/10 dark:bg-primary-dark/20">
              <Users className="h-6 w-6 text-primary dark:text-primary-light" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Intake
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {courseDetails.intake} students
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light/10 dark:bg-primary-dark/20">
              <FileText className="h-6 w-6 text-primary dark:text-primary-light" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Coordinators
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {courseDetails.coordinators.join(", ")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Semesters
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[3, 4, 5, 6].map((semesterNumber, index) => (
            <motion.div
              key={semesterNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              <SemesterCard
                semesterNumber={semesterNumber}
                onClick={handleSemesterClick}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSemester && (
        <SemesterModal
          isOpen={isSemesterModalOpen}
          onClose={() => setIsSemesterModalOpen(false)}
          semesterNumber={selectedSemester}
          semesterData={
            courseDetails.semesters[
              selectedSemester as keyof typeof courseDetails.semesters
            ]
          }
          courseTitle={courseDetails.title}
          academicSession={academicSession}
          semesterLink={undefined}
        />
      )}
    </AnimationContainer>
  );
}
