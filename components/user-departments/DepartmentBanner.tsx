"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  GraduationCap,
} from "lucide-react";

interface DepartmentInfo {
  name: string;
  description: string;
  highlights: string[];
  stats: {
    students: number;
    faculty: number;
    courses: number;
    placement: string;
  };
  established: string;
  accreditation: string[];
}

// Mock department data - replace with actual API call
const departmentData: Record<string, DepartmentInfo> = {
  "computer-science": {
    name: "Computer Science & Engineering",
    description:
      "Our Computer Science & Engineering department stands at the forefront of technological innovation, preparing students for the digital future. With cutting-edge curriculum, world-class faculty, and state-of-the-art laboratories, we nurture the next generation of software engineers, data scientists, and tech leaders.",
    highlights: [
      "Industry-aligned curriculum with latest technologies",
      "Strong placement record with top tech companies",
      "Research opportunities in AI, ML, and Cybersecurity",
      "Modern labs with latest hardware and software",
      "Industry partnerships and internship programs",
    ],
    stats: {
      students: 450,
      faculty: 28,
      courses: 35,
      placement: "95%",
    },
    established: "1995",
    accreditation: ["NBA", "NAAC A+", "ISO 9001:2015"],
  },
  mechanical: {
    name: "Mechanical Engineering",
    description:
      "The Mechanical Engineering department combines traditional engineering principles with modern technology to solve real-world problems. Our comprehensive program covers design, manufacturing, thermal systems, and automation, preparing students for diverse career opportunities in industry and research.",
    highlights: [
      "Advanced manufacturing and automation labs",
      "Strong industry connections for internships",
      "Research in renewable energy and sustainability",
      "CAD/CAM and simulation software training",
      "Hands-on project-based learning approach",
    ],
    stats: {
      students: 380,
      faculty: 24,
      courses: 32,
      placement: "88%",
    },
    established: "1987",
    accreditation: ["NBA", "NAAC A+", "ISO 9001:2015"],
  },
  electrical: {
    name: "Electrical & Electronics Engineering",
    description:
      "Our Electrical & Electronics Engineering department is dedicated to advancing the field of electrical systems, power generation, and electronic devices. We provide comprehensive education in power systems, control systems, and emerging technologies like IoT and smart grids.",
    highlights: [
      "Power systems and renewable energy focus",
      "Advanced control and automation labs",
      "IoT and smart systems research",
      "Industry collaborations for practical exposure",
      "Strong foundation in both theory and application",
    ],
    stats: {
      students: 320,
      faculty: 22,
      courses: 30,
      placement: "92%",
    },
    established: "1990",
    accreditation: ["NBA", "NAAC A+", "ISO 9001:2015"],
  },
};

interface DepartmentBannerProps {
  departmentId: string;
}

export default function DepartmentBanner({
  departmentId,
}: DepartmentBannerProps) {
  const [department, setDepartment] = useState<DepartmentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API
    const fetchDepartmentInfo = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const deptInfo =
          departmentData[departmentId] || departmentData["computer-science"];
        setDepartment(deptInfo);
      } catch (error) {
        console.error("Failed to fetch department info:", error);
        setDepartment(departmentData["computer-science"]);
      } finally {
        setIsLoading(false);
      }
    };

    if (departmentId) {
      fetchDepartmentInfo();
    }
  }, [departmentId]);

  if (isLoading || !department) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded-lg w-96 mb-4"></div>
            <div className="h-4 bg-white/20 rounded w-full max-w-2xl mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-white/10 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Department Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {department.name}
              </h1>
            </div>

            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Est. {department.established}</span>
              </div>
              <div className="flex gap-2">
                {department.accreditation.map((acc) => (
                  <Badge
                    key={acc}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    {acc}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              {department.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <Users className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {department.stats.students}
              </div>
              <div className="text-white/80 text-sm">Students</div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <GraduationCap className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {department.stats.faculty}
              </div>
              <div className="text-white/80 text-sm">Faculty</div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <BookOpen className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {department.stats.courses}
              </div>
              <div className="text-white/80 text-sm">Courses</div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
              <TrendingUp className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {department.stats.placement}
              </div>
              <div className="text-white/80 text-sm">Placement</div>
            </Card>
          </div>

          {/* Highlights */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-6 w-6 text-yellow-300" />
              <h3 className="text-2xl font-bold text-white">
                Why Choose Our Department?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {department.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-yellow-300 rounded-full mt-2"></div>
                  <p className="text-white/90">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
