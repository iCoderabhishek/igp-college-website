"use client";

import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { X } from "lucide-react";

interface AddEditStudyMaterialProps {
  onClose: () => void;
  showToastMessage?: (msg: string) => void;
  getAllStudyMaterials?: () => void;
  StudyMaterialData?: any;
  type?: "add" | "edit";
}

export default function AddEditStudyMaterial({
  onClose,
  showToastMessage,
  getAllStudyMaterials,
  StudyMaterialData,
  type = "add",
}: AddEditStudyMaterialProps) {
  const [title, setTitle] = useState(StudyMaterialData?.title || "");
  const [important, setImportant] = useState(
    StudyMaterialData?.important || false
  );
  const [categories, setCategories] = useState([
    "Notes",
    "Book",
    "Short Notes",
    "Extras",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    StudyMaterialData?.category || "Admission"
  );
  const [newCategory, setNewCategory] = useState("");
  const [content, setContent] = useState(StudyMaterialData?.content || "");
  const [link, setLink] = useState(StudyMaterialData?.link || "");
  const [semester, setSemester] = useState(StudyMaterialData?.semester || "");
  const [department, setDepartment] = useState(
    StudyMaterialData?.department || ""
  );
  const [publisher, setPublisher] = useState(
    StudyMaterialData?.publisher || ""
  );

  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(StudyMaterialData?.date || new Date().toISOString().slice(0, 10));
  }, [StudyMaterialData]);

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async () => {
    const data = {
      title,
      date,
      important,
      category: selectedCategory,
      content,
      department,
      semester,
      publisher,
      link,
    };

    console.log(
      `${type === "edit" ? "Editing" : "Adding"} StudyMaterial:`,
      data
    );

    try {
      const res = await fetch("/api/study-materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit study material");
      }

      const responseData = await res.json();
      console.log("Backend Response:", responseData);

      showToastMessage?.("StudyMaterial saved successfully!");
      getAllStudyMaterials?.();
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      showToastMessage?.("Failed to save study material.");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 shadow-lg mx-auto space-y-1  overflow-x-auto">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        onClick={onClose}
      >
        <X className="text-2xl" />
      </button>

      <h2 className="text-2xl font-semibold text-gray-800">
        {type === "edit" ? "Edit Study Material" : "Add Study Material"}
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

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Type<span className="text-red-500">*</span>
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
          Semester<span className="text-red-500">*</span>
        </label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Semester</option>
          <option value="1">Semester -1 </option>
          <option value="2">Semester -2 </option>
          <option value="3">Semester -3 </option>
          <option value="4">Semester -4 </option>
          <option value="5">Semester -5 </option>
          <option value="6">Semester -6 </option>
        </select>
      </div>

      {/* department */}

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Department<span className="text-red-500">*</span>
        </label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Others">Select Department</option>
          <option value="Computer Science & Technology">
            Computer Science & Technology
          </option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics and Telecommunication">
            Electronics and Telecommunication
          </option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Publisher Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          placeholder="Enter the publisher's name"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Study Material Link (PDF)<span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {type === "edit" ? "Update StudyMaterial" : "Add StudyMaterial"}
      </button>
    </div>
  );
}
