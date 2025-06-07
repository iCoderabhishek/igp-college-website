"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import AddEditNotice from "@/components/notices/AddNotice";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notices", { cache: "no-store" });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch notices");
      }

      setNotices(data.notices);
      setError("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notice: any) => {
    setSelectedNotice(notice);
    setEditModalOpen(true);
  };
  const fetchNoticesAgain = useCallback(fetchNotices, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/notices/${id}`);
      toast.success("Notice deleted successfully");
      fetchNoticesAgain(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete notice");
    }
  };

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Notice Management
          </h1>
          <p className="text-gray-600">
            Manage and publish notices for students and staff
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Notice
        </button>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <AddEditNotice
            onClose={() => setShowAddModal(false)}
            getAllNotices={fetchNotices}
            showToastMessage={(msg: any) => toast.success(msg)}
          />
        </div>
      )}

      {editModalOpen && (
        <AddEditNotice
          onClose={() => setEditModalOpen(false)} // Close modal
          getAllNotices={fetchNoticesAgain} // Refresh notices after update
          noticeData={selectedNotice} // Selected notice data for editing
          type="edit" // Specify the type as "edit"
        />
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="all">All Categories</option>
            <option value="admission">Admission</option>
            <option value="examination">Examination</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading notices...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredNotices.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No notices found.
                  </td>
                </tr>
              ) : (
                filteredNotices.map((notice) => (
                  <tr key={notice.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {notice.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {notice.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {notice.date
                        ? new Date(notice.date).toLocaleDateString("en-GB")
                        : notice.createdAt?.seconds
                        ? new Date(
                            notice.createdAt.seconds * 1000
                          ).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {notice.isImportant ? (
                        <span className="text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Important
                        </span>
                      ) : (
                        <span className="text-gray-600">Normal</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(notice)}
                      >
                        <Pencil className="inline w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(notice.id)}
                      >
                        <Trash2 className="inline w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
