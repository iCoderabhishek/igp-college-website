"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import AddEditStudyMaterial from "@/components/study-material/EditStudyMaterial";
import { toast } from "sonner";

// Dummy study materials data

const materialTypes = [
  "All Types",
  "Notes",
  "Lab Manual",
  "Syllabus",
  "Assignment",
  "Question Paper",
];
const departments = [
  "All Departments",
  "Computer Science & Technology",
  "Electrical Engineering",
  "Electronics and Telecommunication",
];

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

export default function StudyMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<StudyMaterial | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredMaterials = materials.filter((material) => {
    const titleMatch =
      material.title?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
    const descMatch =
      material.content?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
    const typeMatch =
      selectedType === "All Types" || material.category === selectedType;
    const deptMatch =
      selectedDepartment === "All Departments" ||
      material.department === selectedDepartment;

    return (titleMatch || descMatch) && typeMatch && deptMatch;
  });

  const fetchAllStudyMaterials = async () => {
    try {
      const res = await fetch("/api/study-materials");
      const data = await res.json();
      if (res.ok) {
        setMaterials(data.studyMaterials); // <-- correct key
      } else {
        toast.error(data.error || "Failed to fetch study materials");
      }
    } catch (error) {
      toast.error("Network error while fetching study materials");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllStudyMaterials();
  }, []);

  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this study material?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/study-materials/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete material");

      toast.success("Study Material deleted successfully");
      fetchAllStudyMaterials();
    } catch (err) {
      toast.error("Error deleting material");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Study Materials</h1>
          <p className="text-gray-600">
            Manage and organize study materials for students
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Material
        </button>
      </div>

      {/* Modal */}
      {(showAddModal || editingMaterial) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <AddEditStudyMaterial
            onClose={() => {
              setShowAddModal(false);
              setEditingMaterial(null);
            }}
            type={editingMaterial ? "edit" : "add"}
            StudyMaterialData={editingMaterial}
            getAllStudyMaterials={fetchAllStudyMaterials}
            showToastMessage={(msg) => toast.success(msg)}
          />
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            {materialTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMaterials.map((material) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {material.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {material.department} • Semester {material.semester}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setEditingMaterial(material)}
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  className="p-1.5 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                  onClick={() => handleDelete(material.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{material.content}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Type:</span>{" "}
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                  {material.category}
                </span>
              </div>
              {/* <div className="text-sm text-gray-600">
                <span className="font-medium">Downloads:</span>{" "}
                <span className="text-primary font-medium">
                  {material.downloads}
                </span>
              </div> */}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div>
                <span className="font-medium">Uploaded by:</span>{" "}
                {material.publisher}
              </div>
              <div>
                <span className="font-medium">Date:</span>{" "}
                {material.createdAt
                  ? formatDate(new Date(material.createdAt.seconds * 1000))
                  : "N/A"}
              </div>
            </div>

            <div className="flex space-x-2">
              <a
                href={material.link}
                className="flex items-center px-3 py-1.5 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
