import React from "react";
import {
  Calendar,
  Users,
  Tag,
  Cpu,
  Zap,
  Radio,
  ExternalLink,
  Star,
} from "lucide-react";
import { Project } from "@/types/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getDepartmentIcon = (department: string) => {
    switch (department.toLowerCase()) {
      case "computer science & technology":
      case "computer science":
        return <Cpu className="h-4 w-4 text-blue-600" />;
      case "electrical engineering":
        return <Zap className="h-4 w-4 text-yellow-600" />;
      case "electronics and telecommunication engineering":
      case "electronics":
        return <Radio className="h-4 w-4 text-green-600" />;
      default:
        return <Cpu className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).getFullYear().toString();
    } catch {
      return dateString;
    }
  };

  const defaultImage =
    "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.projectImage || defaultImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
        {project.important && (
          <div className="absolute top-3 right-3">
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </div>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 ml-2">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(project.date)}
          </div>
        </div>

        {/* Department */}
        <div className="flex items-center mb-3">
          {getDepartmentIcon(project.department)}
          <span className="text-sm text-gray-600 ml-2 font-medium">
            {project.department}
          </span>
        </div>

        {/* Content */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.content}
        </p>

        {/* Team Members */}
        {project.teamMembers && project.teamMembers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 ml-1">
                Team ({project.teamMembers.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.teamMembers.slice(0, 3).map((member, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  {member}
                </span>
              ))}
              {project.teamMembers.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                  +{project.teamMembers.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        {project.category && project.category.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Tag className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium text-gray-700 ml-1">
                Categories
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.category.map((cat, index) => (
                <span
                  key={index}
                  className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-md border border-teal-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Link */}
        {project.link && (
          <div className="pt-3 border-t border-gray-100">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
