"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  ChevronRight,
  FileText,
  Video,
  Calendar,
  Book,
  Users,
  ArrowLeft,
  Loader2,
  Plus,
  Trash,
  Edit,
} from "lucide-react";
import Masonry from "react-masonry-css";
import { useDepartments } from "@/hooks/useDepartment";
import type { Material } from "@/types/department";
import { toast } from "sonner";

// Material data
const materials: Material[] = [
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
];

const academicYears = ["2024-25", "2023-24", "2022-23"];
const semesters = ["3rd", "4th", "5th", "6th"];

export default function DepartmentComponent() {
  const {
    departments,
    isLoading,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartments();

  const [selectedType, setSelectedType] = useState("all");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortSemester, setSortSemester] = useState("all");
  const [activeSection, setActiveSection] = useState("academic");

  const handleViewDetails = (deptId: string) => {
    setSelectedDept(deptId);
    setActiveSection("academic");
  };

  const handleDeleteDepartment = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        setSelectedDept(null);
        toast.success("Department deleted successfully");
      } catch (error) {
        toast.error("Failed to delete department");
      }
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === "all" || material.type === selectedType;

    const matchesSemester =
      sortSemester === "all" || material.semester === sortSemester;

    return matchesSearch && matchesType && matchesSemester;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading departments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Department Cards */}
      <AnimatePresence mode="wait">
        {!selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-56">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                    <h3 className="text-white text-2xl font-bold">
                      {dept.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm uppercase tracking-wider">
                      Department of
                    </p>
                    <p className="text-xl font-semibold text-primary mt-1">
                      {dept.shortName}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm uppercase tracking-wider">
                      Head of Department
                    </p>
                    <p className="font-medium mt-1">{dept.hod}</p>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {dept.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewDetails(dept.id)}
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                    >
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => handleDeleteDepartment(dept.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Department Details */}
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <Button
              onClick={() => setSelectedDept(null)}
              variant="ghost"
              className="mb-8 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Departments
            </Button>

            {/* Department Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary mb-3">
                Department of{" "}
                {departments.find((d) => d.id === selectedDept)?.name}
              </h2>
              <p className="text-gray-600 text-lg">
                {departments.find((d) => d.id === selectedDept)?.description}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {["academic", "materials", "labs"].map((section) => (
                <Button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  variant={activeSection === section ? "default" : "outline"}
                  className="flex-1 sm:flex-none min-w-[150px]"
                >
                  {section === "academic" && "Academic Sessions"}
                  {section === "materials" && "Study Materials"}
                  {section === "labs" && "Labs & Facilities"}
                </Button>
              ))}
            </div>

            {/* Academic Sessions Section */}
            {activeSection === "academic" && (
              <div className="space-y-8">
                {/* Year Selection */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {academicYears.map((year) => (
                    <Button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      variant={selectedYear === year ? "default" : "outline"}
                      className="flex-1 sm:flex-none"
                    >
                      {year}
                    </Button>
                  ))}
                </div>

                {/* Semester Tabs */}
                <Tabs defaultValue={semesters[0]} className="w-full">
                  <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent h-auto p-0">
                    {semesters.map((sem) => (
                      <TabsTrigger
                        key={sem}
                        value={sem}
                        className="data-[state=active]:bg-primary data-[state=active]:text-white px-8 py-3 rounded-lg"
                      >
                        {sem} Semester
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {semesters.map((sem) => (
                    <TabsContent key={sem} value={sem}>
                      <div className="space-y-6 mt-8">
                        {/* Content sections with improved styling */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                          <h4 className="font-semibold mb-4 flex items-center text-lg">
                            <FileText className="h-5 w-5 text-primary mr-3" />
                            Syllabus
                          </h4>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            View Syllabus PDF
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Tests Table */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h2 className="font-semibold mb-6 text-xl text-primary">
                            Continuous Evaluation Tests
                          </h2>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    SL No
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Subject
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Test
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Exam Date
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Live Link
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4">1</td>
                                  <td className="px-6 py-4">Sample Subject</td>
                                  <td className="px-6 py-4">Test-1</td>
                                  <td className="px-6 py-4">2024-04-15</td>
                                  <td className="px-6 py-4">
                                    <Button variant="link" className="p-0">
                                      View
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Assignments Table */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <h2 className="font-semibold mb-6 text-xl text-primary">
                            Assignments
                          </h2>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    SL No
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Subject
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Assignment
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Last Submission
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    Live Link
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                  <td className="px-6 py-4">1</td>
                                  <td className="px-6 py-4">Sample Subject</td>
                                  <td className="px-6 py-4">Assignment I</td>
                                  <td className="px-6 py-4">2024-04-30</td>
                                  <td className="px-6 py-4">
                                    <Button variant="link" className="p-0">
                                      View
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Previous Year Questions */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                          <h4 className="font-semibold mb-4 text-lg">
                            Previous Year Questions
                          </h4>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            View PYQ PDF
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* Study Materials Section */}
            {activeSection === "materials" && (
              <div className="space-y-8">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search materials..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={sortSemester} onValueChange={setSortSemester}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem}>
                          {sem} Semester
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaterials.map((material, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center mb-4">
                        {material.type === "pdf" ? (
                          <FileText className="h-6 w-6 text-primary mr-3" />
                        ) : (
                          <Video className="h-6 w-6 text-primary mr-3" />
                        )}
                        <h4 className="font-semibold text-lg">
                          {material.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {material.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        {material.type === "pdf"
                          ? "Download PDF"
                          : "Watch Video"}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Labs & Facilities Section */}
            {activeSection === "labs" && (
              <div>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="flex -ml-6 w-auto"
                  columnClassName="pl-6 bg-clip-padding"
                >
                  {departments
                    .find((d) => d.id === selectedDept)
                    ?.labs.map((lab, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="relative h-56">
                          <Image
                            src={lab.image}
                            alt={lab.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="font-semibold text-xl mb-3">
                            {lab.name}
                          </h4>
                          <p className="text-gray-600">{lab.description}</p>
                        </div>
                      </motion.div>
                    ))}
                </Masonry>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
