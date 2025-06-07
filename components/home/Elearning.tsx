"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  BookOpen,
  Download,
  ExternalLink,
  Calendar,
  User,
  GraduationCap,
  SortAsc,
  SortDesc,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface StudyMaterial {
  id: string;
  title: string;
  content: string;
  category: string;
  department: string;
  semester: string;
  publisher: string;
  date: string;
  important: boolean;
  link: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt?: {
    seconds: number;
    nanoseconds: number;
  };
}

const departments = [
  { value: "all", label: "All Departments" },
  {
    value: "Computer Science & Technology",
    label: "Computer Science & Technology",
  },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  {
    value: "Electronics and Telecommunication",
    label: "Electronics & Telecommunication",
  },
];

const materialTypes = [
  { value: "all", label: "All Types" },
  { value: "Book", label: "Books" },
  { value: "Video", label: "Videos" },
  { value: "Notes", label: "Notes" },
  { value: "Lab Manual", label: "Lab Manual" },
  { value: "Syllabus", label: "Syllabus" },
  { value: "Assignment", label: "Assignment" },
  { value: "Question Paper", label: "Question Paper" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "Title A-Z" },
  { value: "department", label: "Department" },
];

export default function ElearningPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/study-materials");
        const data = await res.json();

        if (res.ok) {
          setMaterials(data.studyMaterials || []);
        } else {
          toast.error(data.error || "Failed to fetch study materials");
          setMaterials([]);
        }
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
        toast.error("Network error while fetching study materials");
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, []);

  const formatDate = (material: StudyMaterial) => {
    if (material.createdAt) {
      return new Date(material.createdAt.seconds * 1000).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
    }
    return material.date
      ? new Date(material.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "notes":
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case "lab manual":
        return <FileText className="h-5 w-5 text-green-600" />;
      case "syllabus":
        return <GraduationCap className="h-5 w-5 text-purple-600" />;
      case "assignment":
        return <FileText className="h-5 w-5 text-orange-600" />;
      case "question paper":
        return <FileText className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "notes":
        return "border-l-blue-500 bg-blue-50/50";
      case "lab manual":
        return "border-l-green-500 bg-green-50/50";
      case "syllabus":
        return "border-l-purple-500 bg-purple-50/50";
      case "assignment":
        return "border-l-orange-500 bg-orange-50/50";
      case "question paper":
        return "border-l-red-500 bg-red-50/50";
      default:
        return "border-l-gray-500 bg-gray-50/50";
    }
  };

  const filteredAndSortedMaterials = materials
    .filter((material) => {
      const titleMatch =
        material.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;
      const contentMatch =
        material.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;
      const departmentMatch =
        selectedDepartment === "all" ||
        material.department === selectedDepartment;
      const typeMatch =
        selectedType === "all" || material.category === selectedType;

      return (titleMatch || contentMatch) && departmentMatch && typeMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          if (a.createdAt && b.createdAt) {
            return b.createdAt.seconds - a.createdAt.seconds;
          }
          return (
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          );
        case "oldest":
          if (a.createdAt && b.createdAt) {
            return a.createdAt.seconds - b.createdAt.seconds;
          }
          return (
            new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "department":
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              E-Learning Resources
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive study materials, lab manuals, and academic
            resources curated to enhance your learning experience across all
            departments.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{materials.length} Resources Available</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Multiple Departments</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <Card className="shadow-lg border border-gray-200 mb-10">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Resources
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-white"
                >
                  {materialTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <div className="flex gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        sortBy === option.value
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Showing {filteredAndSortedMaterials.length} of{" "}
                {materials.length} resources
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        {filteredAndSortedMaterials.length === 0 ? (
          <Card className="shadow-lg border border-gray-200">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Resources Found
              </h3>
              <p className="text-gray-600">
                {searchTerm ||
                selectedDepartment !== "all" ||
                selectedType !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "No study materials are currently available."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredAndSortedMaterials.map((material, index) => (
              <Card
                key={material.id}
                className={`group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getCategoryColor(
                  material.category
                )} border border-gray-100`}
              >
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                        {getCategoryIcon(material.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {material.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="inline-flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {material.department}
                          </span>
                          {material.semester && (
                            <span className="inline-flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              Semester {material.semester}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {material.important && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 border-yellow-300"
                      >
                        Important
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {material.content}
                  </p>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span className="font-medium">Publisher:</span>
                      <span>{material.publisher}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Date:</span>
                      <span>{formatDate(material)}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-6">
                    <Badge variant="outline" className="text-sm font-medium">
                      {material.category}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* External Link CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Explore More Resources
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Access additional learning materials and resources on our
                comprehensive e-learning platform.
              </p>
              <a
                href="https://webscte.co.in/E-Learning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                <ExternalLink className="h-5 w-5" />
                Visit E-Learning Portal
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Loading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <Skeleton className="h-12 w-80" />
          </div>
          <Skeleton className="h-6 w-96 mx-auto mb-4" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Filter Loading */}
        <Card className="shadow-lg border border-gray-200 mb-10">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-24 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Materials Loading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="shadow-lg border border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-16 w-full mb-6" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-24 rounded-lg" />
                  <Skeleton className="h-10 w-20 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
