"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface EditFacultyProps {
  onClose: () => void;
  showToastMessage?: (msg: string) => void;
  getAllFaculty?: () => void;
  FacultyData?: any;
  type?: "add" | "edit";
}

export default function EditFaculty({
  onClose,
  showToastMessage,
  getAllFaculty,
  FacultyData,
  type = "add",
}: EditFacultyProps) {
  const [name, setName] = useState(FacultyData?.name || "");
  const [department, setDepartment] = useState(FacultyData?.department || "");
  const [designation, setDesignation] = useState(
    FacultyData?.designation || ""
  );
  const [qualification, setQualification] = useState(
    FacultyData?.qualification || ""
  );
  const [specialization, setSpecialization] = useState(
    FacultyData?.specializations?.[0] || ""
  );
  const [email, setEmail] = useState(FacultyData?.email || "");
  const [phone, setPhone] = useState(FacultyData?.phone || "");
  const [image, setImage] = useState(FacultyData?.image || "");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    const method = type === "edit" ? "PUT" : "POST";
    const response = await fetch("/api/faculty", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: FacultyData?.id, // needed for edit
        name,
        department,
        designation,
        qualification,
        specializations: specialization ? [specialization] : [],
        email,
        phone,
        image,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      showToastMessage?.(result.error || "Something went wrong.");
      return;
    }

    showToastMessage?.(
      type === "edit"
        ? "Faculty updated successfully!"
        : "Faculty added successfully!"
    );
    getAllFaculty?.();
    onClose();
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
        {type === "edit" ? "Edit Faculty" : "Add Faculty"}
      </h2>

      {/* Faculty Title */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Faculty Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Department */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Department<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="eg., Computer Science and Technology"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Designation */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Designation<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="eg., Assistant Professor"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Qualification */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Qualification<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          placeholder="eg., M.Tech in CSE"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Specialization */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Specialization
        </label>
        <input
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="eg., Distributed Systems"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email Address<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Image Url */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Enter Public URL of the Faculty Image
          <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {type === "edit" ? "Update Faculty" : "Add Faculty"}
      </button>
    </div>
  );
}
