"use client";

import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { X } from "lucide-react";

interface EditProjectProps {
  onClose: () => void;
  showToastMessage?: (msg: string) => void;
  getAllProjects?: () => void;
  ProjectData?: any;
  type?: "add" | "edit";
  onSave?: (updatedProject: any) => void;
}

export default function EditProject({
  onClose,
  showToastMessage,
  getAllProjects,
  ProjectData,
  type = "add",
  onSave,
}: EditProjectProps) {
  const [title, setTitle] = useState(ProjectData?.title || "");
  const [important, setImportant] = useState(ProjectData?.important || false);
  const [categories, setCategories] = useState([
    "AI",
    "Energy",
    "IoT",
    "Software",
    "Web",
    "Mobile",
    "Data Science",
    "Machine Learning",
  ]);
  const [selectedCategories, setSelectedCategories] = useState(
    ProjectData?.category || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [content, setContent] = useState(ProjectData?.content || "");
  const [link, setLink] = useState(ProjectData?.link || "");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState(ProjectData?.department || "");
  const [newMember, setNewMember] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>(
    ProjectData?.teamMembers || []
  );
  const [projectImage, setProjectImage] = useState(
    ProjectData?.projectImage || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDate(ProjectData?.date || new Date().toISOString().slice(0, 10));
  }, [ProjectData]);

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (type === "edit" && ProjectData) {
      setTitle(ProjectData.title || "");
      setImportant(ProjectData.important || false);
      setSelectedCategories(ProjectData.category || []);
      setContent(ProjectData.content || "");
      setLink(ProjectData.link || "");
      setDate(ProjectData.date || new Date().toISOString().slice(0, 10));
      setDepartment(ProjectData.department || "");
      setTeamMembers(ProjectData.teamMembers || []);
      setProjectImage(ProjectData.projectImage || "");
    }
  }, [ProjectData, type]);

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      showToastMessage?.("Title is required");
      return;
    }
    if (!content.trim()) {
      showToastMessage?.("Content is required");
      return;
    }
    if (!department) {
      showToastMessage?.("Department is required");
      return;
    }
    if (selectedCategories.length === 0) {
      showToastMessage?.("At least one category must be selected");
      return;
    }

    setIsSubmitting(true);

    const data = {
      title: title.trim(),
      content: content.trim(),
      category: selectedCategories,
      link: link.trim(),
      department,
      teamMembers,
      projectImage: projectImage.trim(),
      date,
      important,
      id: ProjectData?.id,
    };

    // Add id for edit mode
    if (type === "edit" && ProjectData?.id) {
      data.id = ProjectData.id;
    }

    try {
      const res = await fetch(
        type === "edit"
          ? `/api/projects/${ProjectData.id}` // PUT for existing project
          : "/api/projects", // POST for new project
        {
          method: type === "edit" ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Network response was not ok");
      }

      showToastMessage?.(
        type === "edit"
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      // If parent passed onSave (edit mode), update local state
      if (type === "edit" && onSave) {
        onSave({ ...ProjectData, ...data });
      } else {
        // If new project or using fetch, refresh project list
        getAllProjects?.();
      }

      onClose();
    } catch (error: any) {
      console.error("Error submitting project:", error);
      showToastMessage?.(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleAddMember = () => {
    if (newMember.trim() && !teamMembers.includes(newMember.trim())) {
      setTeamMembers([...teamMembers, newMember.trim()]);
      setNewMember("");
    }
  };

  const handleRemoveMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(cat) ? prev.filter((c: any) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[95%] xl:max-w-3xl bg-white rounded-2xl p-4 sm:p-6 h-auto shadow-lg mx-auto space-y-4 overflow-y-auto max-h-[90vh]">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        onClick={onClose}
      >
        <X className="text-2xl" />
      </button>

      <h2 className="text-2xl font-semibold text-gray-800">
        {type === "edit" ? "Edit Project" : "Add Project"}
      </h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Department */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Department<span className="text-red-500">*</span>
        </label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select department</option>
          <option value="CST">Computer Science and Technology (CST)</option>
          <option value="EE">Electrical Engineering (EE)</option>
          <option value="ETCE">Electronics and Telecommunication (ETCE)</option>
        </select>
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
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                selectedCategories.includes(cat)
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
            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
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
          required
        />
      </div>

      {/* Team Members */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Team Members
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Enter member name"
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            onKeyPress={(e) => e.key === "Enter" && handleAddMember()}
          />
          <button
            type="button"
            onClick={handleAddMember}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add Member
          </button>
        </div>
        {teamMembers.length > 0 && (
          <ul className="mt-2 mb-2 space-y-2">
            {teamMembers.map((member, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
              >
                <span className="text-gray-700">{member}</span>
                <button
                  onClick={() => handleRemoveMember(idx)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Project Link (Optional)
        </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Project Image URL (Optional)
        </label>
        <input
          type="url"
          value={projectImage}
          onChange={(e) => setProjectImage(e.target.value)}
          placeholder="https://example.com/project-image.jpg"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Important Toggle */}
      <div className="flex items-center space-x-2">
        <Switch checked={important} onCheckedChange={setImportant} />
        <label className="text-sm font-medium text-gray-700">
          Mark as Important Project
        </label>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? type === "edit"
            ? "Updating..."
            : "Adding..."
          : type === "edit"
          ? "Update Project"
          : "Add Project"}
      </button>
    </div>
  );
}
