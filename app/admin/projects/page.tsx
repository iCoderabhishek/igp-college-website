"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pencil, Trash2, Tag, Users } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import EditProject from "@/components/projects/EditProject";
import { toast } from "sonner";

type Project = {
  id: string;
  title: string;
  description: string;
  department: string;
  teamMembers: string[];
  image: string;
  category: string[];
  createdAt: any;
  link: string[];
  projectImage: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchAllProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete project");

      toast.success("Project deleted");
      //@ts-ignore
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Projects</h1>
          <p className="text-gray-600">Manage and showcase student projects</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Project
        </button>
      </div>
      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/40">
          <EditProject
            onClose={() => setShowAddModal(false)}
            getAllProjects={fetchAllProjects}
            showToastMessage={(msg) => toast.success(msg)}
          />
        </div>
      )}
      {editingProject && (
        <EditProject
          ProjectData={editingProject}
          type="edit"
          onClose={() => setEditingProject(null)}
          onSave={(updatedProject: Project) => {
            setProjects((prev) =>
              prev.map((proj) =>
                proj.id === updatedProject.id ? updatedProject : proj
              )
            );
            toast.success("Project updated");
            setEditingProject(null);
          }}
        />
      )}
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="all">All Departments</option>
            <option value="cst">Computer Science & Technology</option>
            <option value="ee">Electrical Engineering</option>
            <option value="etce">Electronics and Telecommunication</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            Loading projects...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 py-10">
            {error}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No projects found.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 w-full">
                {project.projectImage ? (
                  <Image
                    src={project.projectImage || "/project-fallback-img.png"}
                    alt={project.title || "Project Image"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}

                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center mb-3">
                  <Tag className="h-4 w-4 text-primary mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {project.category.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-gray-600">Team Members:</span>
                </div>
                <div className="pl-6 space-y-1">
                  {project.teamMembers.map((member, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {member}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Project by {project.department} dept.
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {new Date(
                      project.createdAt.seconds * 1000
                    ).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="pl-6 space-y-1">
                  <div className="text-sm text-gray-600">
                    Live link:{" "}
                    <span className="font-semibold text-primary">
                      {project.link}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
