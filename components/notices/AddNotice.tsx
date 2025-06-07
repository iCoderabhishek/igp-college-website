"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface AddEditNoticeProps {
  onClose: () => void;
  getAllNotices?: () => void;
  noticeData?: any;
  type?: "add" | "edit";
  onUpdate?: any;
  showToastMessage?: any;
}

export default function AddEditNotice({
  onClose,
  onUpdate,
  getAllNotices,
  noticeData,
  type = "add",
  showToastMessage,
}: AddEditNoticeProps) {
  const [title, setTitle] = useState(noticeData?.title || "");
  const [isImportant, setIsImportant] = useState(
    noticeData?.isImportant || false
  );
  const [categories, setCategories] = useState([
    "Admission",
    "Exams",
    "Events",
    "Results",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    noticeData?.category || "Admission"
  );
  const [newCategory, setNewCategory] = useState("");
  const [content, setContent] = useState(noticeData?.content || "");
  const [noticeLink, setNoticeLink] = useState(noticeData?.noticeLink || "");
  const [createdBy, setCreatedBy] = useState(noticeData?.createdBy || "");
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(noticeData?.date || new Date().toISOString().slice(0, 10));
  }, [noticeData]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCreatedBy(user.displayName || user.email || user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Title and content are required!");
      return;
    }

    const data = {
      title,
      content,
      category: selectedCategory,
      isImportant,
      noticeLink: noticeLink || "",
      createdBy,
      date,
      id: noticeData?.id, // included only for edit
    };

    try {
      if (type === "edit") {
        await axiosInstance.put("/notices", data); // Update existing notice
        toast.success("Notice updated successfully!");
      } else {
        await axiosInstance.post("/notices", data); // Add new notice
        toast.success("Notice added successfully!");
      }

      if (getAllNotices) {
        getAllNotices();
      }
      onClose();
    } catch (error: any) {
      console.error("Failed to submit notice:", error);
      toast.error(
        error.response?.data?.error || "Failed to submit notice. Try again."
      );
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 shadow-lg mx-auto space-y-5">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-2xl font-semibold text-gray-800">
        {type === "edit" ? "Edit Notice" : "Add Notice"}
      </h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-gray-700 font-medium">Mark as Important</label>
        <Switch checked={isImportant} onCheckedChange={setIsImportant} />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Select Category<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Content<span className="text-red-500">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Notice Link (PDF)<span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={noticeLink}
          onChange={(e) => setNoticeLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {type === "edit" ? "Update Notice" : "Add Notice"}
      </button>
    </div>
  );
}
