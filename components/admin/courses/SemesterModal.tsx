"use client";

import { useState } from "react";
import {
  X,
  FileText,
  Search,
  Filter,
  ExternalLink,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SemesterData } from "@/lib/mock-data";

interface SemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  semesterNumber: number;
  semesterData: SemesterData | any;
  courseTitle: string;
  academicSession: string;
  semesterLink: any;
}

const tabs = [
  { id: "syllabus", label: "Syllabus" },
  { id: "tests", label: "Tests" },
  { id: "assignments", label: "Assignments" },
  { id: "previous-year", label: "Previous Year Questions" },
  { id: "study-materials", label: "Study Materials" },
];

export function SemesterModal({
  isOpen,
  onClose,
  semesterNumber,
  semesterData,
  semesterLink,
  courseTitle,
  academicSession,
}: SemesterModalProps) {
  const [activeTab, setActiveTab] = useState("syllabus");
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const filteredPreviousYear: any = semesterData.previousYearQuestions.filter(
    (q: any) => {
      if (yearFilter && q.year !== yearFilter) return false;
      if (
        searchTerm &&
        !q.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      return true;
    }
  );

  const filteredStudyMaterials = semesterData.studyMaterials.filter(
    (m: any) => {
      if (
        searchTerm &&
        !m.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !m.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      return true;
    }
  );

  const availableYears = [
    // ...new Set(semesterData.previousYearQuestions.map((q: any) => q.year)),
  ].sort((a, b) => b - a);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm dark:bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <motion.div
              className="relative w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800 flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  <span className="text-primary dark:text-primary-light">
                    {courseTitle}
                  </span>{" "}
                  - Semester {semesterNumber} ({academicSession})
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-4 px-6" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-4 text-sm font-medium relative ${
                        activeTab === tab.id
                          ? "text-primary dark:text-primary-light"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-light"
                          initial={false}
                        />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "syllabus" && (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          Syllabus for Semester {semesterNumber}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Academic Session: {academicSession}
                        </p>
                      </div>
                      <a
                        href={semesterData.syllabusLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Syllabus
                      </a>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        The syllabus covers all subjects, course objectives,
                        learning outcomes, and evaluation methods for Semester{" "}
                        {semesterNumber} of {courseTitle}.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "tests" && (
                  <div>
                    <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Continuous Evaluation Tests
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Test Number
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                          {semesterData.tests.length > 0 ? (
                            semesterData.tests.map((test: any) => (
                              <tr
                                key={test.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                  Test {test.testNumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {test.subject}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                  <span
                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      test.status === "Completed"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}
                                  >
                                    {test.status}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(
                                    test.startDate
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(test.endDate).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <a
                                    href={test.questionPdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark dark:text-primary-light"
                                  >
                                    <Download className="h-4 w-4" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                              >
                                No tests available for this semester.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "assignments" && (
                  <div>
                    <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      Assignments
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Assignment
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Submission Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                          {semesterData.assignments.length > 0 ? (
                            semesterData.assignments.map((assignment: any) => (
                              <tr
                                key={assignment.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                  {assignment.subject}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {assignment.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(
                                    assignment.submissionDate
                                  ).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <a
                                    href={assignment.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark dark:text-primary-light"
                                  >
                                    <Download className="h-4 w-4" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                              >
                                No assignments available for this semester.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "previous-year" && (
                  <div>
                    <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        Previous Year Questions
                      </h4>
                      <div className="flex space-x-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search subject..."
                            className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus-visible:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                        <select
                          value={yearFilter || ""}
                          onChange={(e) =>
                            setYearFilter(
                              e.target.value ? Number(e.target.value) : null
                            )
                          }
                          className="rounded-md border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm outline-none focus-visible:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">All Years</option>
                          {availableYears.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Subject
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Year
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Difficulty
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                          {filteredPreviousYear.length > 0 ? (
                            filteredPreviousYear.map((question: any) => (
                              <tr
                                key={question.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                                  {question.subject}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {question.year}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                  <span
                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      question.difficulty === "Easy"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : question.difficulty === "Medium"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    }`}
                                  >
                                    {question.difficulty}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <a
                                    href={question.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark dark:text-primary-light"
                                  >
                                    <Download className="h-4 w-4" />
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                              >
                                No previous year questions found matching your
                                filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "study-materials" && (
                  <div>
                    <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        Study Materials
                      </h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search subject..."
                          className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus-visible:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Subject Code
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Subject Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              PDF
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Video
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                          {filteredStudyMaterials.length > 0 ? (
                            filteredStudyMaterials.map((material: any) => (
                              <tr
                                key={material.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                              >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                  {material.subjectCode}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {material.subjectName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                                  <a
                                    href={material.pdfLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary hover:text-primary-dark dark:text-primary-light"
                                  >
                                    <FileText className="h-4 w-4" />
                                  </a>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                                  {material.videoLink ? (
                                    <a
                                      href={material.videoLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center text-primary hover:text-primary-dark dark:text-primary-light"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  ) : (
                                    <span className="text-gray-400">—</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                              >
                                No study materials found matching your search.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
