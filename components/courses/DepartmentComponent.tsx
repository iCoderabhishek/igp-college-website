"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  ChevronRight,
  FileText,
  Video,
  Calendar,
  Book,
  Users,
} from "lucide-react";
import Masonry from "react-masonry-css";

//material data

const materials = [
  {
    type: "pdf",
    title: "Internet of Things",
    description: "Get started with IoT",
    link: "#",
    semester: "3rd",
  },
  {
    type: "video",
    title: "Machine Learning",
    description: "Learn about machine learning",
    link: "#",
    semester: "6th",
  },
  {
    type: "pdf",
    title: "Database Management",
    description: "Learn about database management",
    link: "#",
    semester: "5th",
  },
  {
    type: "video",
    title: "Computer Networks",
    description: "Learn about computer networks",
    link: "#",
    semester: "4th",
  },
  {
    type: "pdf",
    title: "Operating Systems",
    description: "Learn about operating systems",
    link: "#",
    semester: "3rd",
  },

  // Add more materials as needed
];

// Department data
const departments = [
  {
    id: "cst",
    name: "Computer Science and Technology",
    shortName: "CST",
    hod: "Ms. MOUSUMI BISWAS",
    image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
    description:
      "The Department of Computer Science and Technology focuses on providing quality education in various areas including programming, software development, database management, and computer networks.",
    faculty: [
      {
        name: "Ms. MOUSUMI BISWAS",
        designation: "HOD & Assistant Professor",
        qualification: "M.Tech in CSE",
        specialization: "Database Systems",
      },
      // Add more faculty members
    ],
    labs: [
      {
        name: "Programming Lab",
        image:
          "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
        description: "Well-equipped lab for programming practice",
      },
      {
        name: "Networking Lab",
        image:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        description: "Modern networking equipment and tools",
      },
    ],
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    shortName: "EE",
    hod: "Mr. SNEHASHIS DHALI",
    image: "https://images.pexels.com/photos/159886/pexels-photo-159886.jpeg",
    description:
      "The Department of Electrical Engineering provides comprehensive education in electrical systems, power generation, and control systems.",
    faculty: [
      {
        name: "Mr. SNEHASHIS DHALI",
        designation: "HOD & Assistant Professor",
        qualification: "M.Tech in Electrical Engineering",
        specialization: "Power Systems",
      },
    ],
    labs: [
      {
        name: "Power Systems Lab",
        image:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        description: "State-of-the-art power systems laboratory",
      },
    ],
  },
  {
    id: "etce",
    name: "Electronics and Telecommunication Engineering",
    shortName: "ETCE",
    hod: "Mr. CHANDI CHARAN JANA",
    image: "https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg",
    description:
      "The Department of Electronics and Telecommunication Engineering focuses on electronic circuits, communication systems, and signal processing.",
    faculty: [
      {
        name: "Mr. CHANDI CHARAN JANA",
        designation: "HOD & Assistant Professor",
        qualification: "M.Tech in Electronics",
        specialization: "Communication Systems",
      },
    ],
    labs: [
      {
        name: "Electronics Lab",
        image:
          "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        description: "Modern electronics and testing equipment",
      },
    ],
  },
];

const academicYears = ["2024-25", "2023-24", "2022-23"];
const semesters = ["3rd", "4th", "5th", "6th"];

export default function DepartmentComponent() {
  const [selectedType, setSelectedType] = useState("all");

  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortSemester, setSortSemester] = useState("all");
  const [activeSection, setActiveSection] = useState("academic");

  const handleViewDetails = (deptId: string) => {
    setSelectedDept(deptId);
    setActiveSection("academic");
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const filteredMaterials = (materials || []).filter((material) => {
    if (!material || !material.title) return false;

    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || material.type === selectedType;

    const matchesSemester =
      sortSemester === "all" || material.semester === sortSemester;

    return matchesSearch && matchesType && matchesSemester;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Department Cards */}
      {!selectedDept && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">{dept.name}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm">Department of</p>
                  <p className="text-lg font-semibold text-primary">
                    {dept.shortName}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 text-sm">Head of Department</p>
                  <p className="font-medium">{dept.hod}</p>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {dept.description}
                </p>
                <button
                  onClick={() => handleViewDetails(dept.id)}
                  className="flex items-center text-primary hover:underline"
                >
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Department Details */}
      {selectedDept && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <button
            onClick={() => setSelectedDept(null)}
            className="mb-6 text-primary hover:underline"
          >
            ← Back to Departments
          </button>

          {/* Department Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">
              Department of{" "}
              {departments.find((d) => d.id === selectedDept)?.name}
            </h2>
            <p className="text-gray-600">
              {departments.find((d) => d.id === selectedDept)?.description}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveSection("academic")}
              className={`px-4 py-2 rounded-lg ${
                activeSection === "academic"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Academic Sessions
            </button>
            <button
              onClick={() => setActiveSection("materials")}
              className={`px-4 py-2 rounded-lg ${
                activeSection === "materials"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Study Materials
            </button>
            <button
              onClick={() => setActiveSection("labs")}
              className={`px-4 py-2 rounded-lg ${
                activeSection === "labs"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Labs & Facilities
            </button>
          </div>

          {/* Academic Sessions Section */}
          {activeSection === "academic" && (
            <div>
              {/* Year Selection */}
              <div className="flex space-x-2 mb-6">
                {academicYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedYear === year
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Semester Tabs */}
              <Tabs
                defaultValue={semesters[0]}
                className="w-full overflow-auto"
              >
                <TabsList className="mb-6 ">
                  {semesters.map((sem) => (
                    <TabsTrigger key={sem} value={sem}>
                      {sem} Semester
                    </TabsTrigger>
                  ))}
                </TabsList>

                {semesters.map((sem) => (
                  <TabsContent key={sem} value={sem}>
                    <div className="space-y-6">
                      {/* Syllabus */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <FileText className="h-5 w-5 text-primary mr-2" />
                          Syllabus
                        </h4>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          View Syllabus PDF
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>

                      {/* Tests Table */}
                      <div>
                        <h2 className="font-semibold mb-3 text-lg text-primary-light">
                          Continuous Evaluation Tests
                        </h2>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left">SL No</th>
                                <th className="px-4 py-2 text-left">Subject</th>
                                <th className="px-4 py-2 text-left">Test</th>
                                <th className="px-4 py-2 text-left">
                                  Exam Date
                                </th>
                                <th className="px-4 py-2 text-left">
                                  Live Link
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2">Sample Subject</td>
                                <td className="px-4 py-2">Test-1</td>
                                <td className="px-4 py-2">2024-04-15</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Assignments Table */}
                      <div>
                        <h2 className="font-semibold mb-3 text-lg text-primary-light">
                          Assignments
                        </h2>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left">SL No</th>
                                <th className="px-4 py-2 text-left">Subject</th>
                                <th className="px-4 py-2 text-left">
                                  Assignment
                                </th>
                                <th className="px-4 py-2 text-left">
                                  Last Submission Date
                                </th>
                                <th className="px-4 py-2 text-left">
                                  Live Link
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-4 py-2">1</td>
                                <td className="px-4 py-2">Sample Subject</td>
                                <td className="px-4 py-2">Assignment I</td>
                                <td className="px-4 py-2">2024-04-30</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Previous Year Questions */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">
                          Previous Year Questions
                        </h4>
                        <a
                          href="#"
                          className="text-primary hover:underline flex items-center"
                        >
                          View PYQ PDF
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Study Materials Section */}
          {activeSection === "materials" && (
            <div>
              <div className="mb-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search materials..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* flters */}
                  <select
                    className="px-4 py-2 border rounded-lg"
                    value={sortSemester}
                    onChange={(e) => setSortSemester(e.target.value)}
                  >
                    <option value="all">All Semesters</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                  </select>

                  <select className="px-4 py-2 border rounded-lg">
                    <option value="all">All Types</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.map((material, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        {material.type === "pdf" ? (
                          <FileText className="h-5 w-5 text-primary mr-2" />
                        ) : (
                          <Video className="h-5 w-5 text-primary mr-2" />
                        )}
                        <h4 className="font-medium">{material.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {material.description}
                      </p>
                      <a
                        href={material.link}
                        className="text-primary hover:underline text-sm"
                      >
                        {material.type === "pdf"
                          ? "Download PDF"
                          : "Watch Video"}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Labs & Facilities Section */}
          {activeSection === "labs" && (
            <div>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {departments
                  .find((d) => d.id === selectedDept)
                  ?.labs.map((lab, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
                    >
                      <div className="relative h-48">
                        <Image
                          src={lab.image}
                          alt={lab.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">{lab.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {lab.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </Masonry>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
