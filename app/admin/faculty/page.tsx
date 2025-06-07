"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import EditFaculty from "@/components/faculty/EditFaculty";
import { toast } from "sonner";

type FacultyMember = {
  id: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  email: string;
  phone: string;
  image: string;
  specializations: string[];
};

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]); // Ensure it's an empty array
  const [editFaculty, setEditFaculty] = useState<FacultyMember | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Move this up
  const fetchAllFaculty = async (): Promise<FacultyMember[]> => {
    const res = await fetch("/api/faculty");
    if (!res.ok) throw new Error("Failed to fetch faculty data");

    const data = await res.json();
    return data.faculties;
  };

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const data = await fetchAllFaculty();
        console.log(data); // Log data to check its structure
        if (Array.isArray(data)) {
          setFacultyList(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (err) {
        setError("Failed to fetch faculty");
        toast.error("Failed to load faculty list");
      } finally {
        setLoading(false);
      }
    };

    loadFaculty();
  }, []);

  const deleteFaculty = async (id: string) => {
    try {
      // const res = await fetch(`/api/faculty/${id}`, { method: "DELETE" });
      const res = await fetch(`/api/faculty?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete faculty");

      setFacultyList((prev) => prev.filter((f) => f.id !== id));
      toast.success("Faculty deleted successfully");
    } catch (error) {
      toast.error("Failed to delete faculty");
    }
  };

  const handleAddClick = () => {
    setEditFaculty(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleEditClick = (faculty: FacultyMember) => {
    setEditFaculty(faculty);
    setModalType("edit");
    setShowModal(true);
  };

  const filteredFaculty = (facultyList ?? [])
    .filter(
      (faculty) =>
        selectedDepartment === "All" ||
        faculty.department === selectedDepartment
    )
    .filter((faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Faculty Overview
          </h1>

          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-3">
              Faculty by Departments
            </h2>
            <ul className="space-y-1">
              {Object.entries(
                facultyList.reduce((acc, curr) => {
                  acc[curr.department] = (acc[curr.department] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([dept, count]) => (
                <li key={dept}>
                  <strong>{dept}:</strong> {count}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-600">
            Manage faculty members and their information
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Faculty
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <EditFaculty
            FacultyData={modalType === "edit" ? editFaculty : null}
            type={modalType ?? "add"}
            onClose={() => {
              setShowModal(false);
              setEditFaculty(null);
              setModalType(null);
            }}
            getAllFaculty={async () => {
              try {
                const data = await fetchAllFaculty();
                if (Array.isArray(data)) {
                  setFacultyList(data);
                }
              } catch (error) {
                toast.error("Failed to reload faculty list");
              }
            }}
            showToastMessage={(msg) => toast(msg)}
          />
        </div>
      )}
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science & Technology">
              Computer Science & Technology
            </option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Electronics and Telecommunication">
              Electronics and Telecommunication
            </option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* Faculty Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading faculty data...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Failed to load faculty. Please try again later.
        </div>
      ) : filteredFaculty.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No faculty added.</div>
      ) : (
        <>
          {/* optional Table View */}

          <div className="flex justify-between items-center mb-4 mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Faculty List
            </h2>
          </div>
          {/* Optional Table View */}

          <table className="w-full text-left border mt-6 mb-14">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Department</th>
                <th className="p-2">Designation</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="p-2">{member.name}</td>
                  <td className="p-2">{member.department}</td>
                  <td className="p-2">{member.designation}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* optional Table View */}
          {/* Faculty Grid */}
          <div className="w-full text-left border mt-6 p-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {" "}
              Individual Faculty
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      // onClick={() => setEditFaculty(member)}
                      onClick={() => handleEditClick(member)}

                      // className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                    >
                      <Pencil className="h-4 w-4 text-gray-600" />
                    </button>

                    <button
                      onClick={async () => {
                        const confirmed = window.confirm(
                          "Are you sure you want to delete this faculty?"
                        );
                        if (!confirmed) return;
                        try {
                          await deleteFaculty(member.id);
                          const updatedList = await fetchAllFaculty();
                          setFacultyList(updatedList);
                          toast.success("Faculty deleted");
                        } catch (err) {
                          toast.error("Error deleting faculty");
                        }
                      }}
                      className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {member.designation}
                    </p>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 text-primary mr-2" />
                      {member.qualification}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-primary mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-primary mr-2" />
                      {member.phone}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Specializations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
