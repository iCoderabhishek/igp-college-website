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
  fullName: string;
  description: string;
  vision: string;
  mission: string;
  highlights: string[];
  stats: {
    students: number;
    faculty: number;
    programs: number;
    placement: string;
  };
  established: string;
  accreditation: string[];
  affiliations: string[];
}

const eeDepartmentData: DepartmentInfo = {
  name: "Electrical Engineering",
  fullName: "Department of Electrical Engineering",
  description:
    "The Department of Electrical Engineering at Government Polytechnic is committed to providing quality technical education and training to students in the field of computer science, software development, and emerging technologies. Our department emphasizes practical learning, industry readiness, and innovation to meet the growing demands of the IT sector.",
  vision:
    "To be a center of excellence in technical education, producing skilled technicians and entrepreneurs who contribute to national development and technological advancement.",
  mission:
    "To provide comprehensive technical education through innovative teaching methodologies, industry collaboration, and research activities while maintaining the highest standards of academic excellence and professional ethics.",
  highlights: [
    "AICTE approved diploma programs with updated curriculum",
    "Industry-standard laboratories with modern equipment",
    "Experienced faculty with industry and academic expertise",
    "Strong placement cell with tie-ups with leading IT companies",
    "Regular workshops, seminars, and skill development programs",
    "Student-centric learning with project-based approach",
    "Government scholarship and financial assistance programs",
    "Active technical societies and coding clubs",
  ],
  stats: {
    students: 240,
    faculty: 12,
    programs: 3,
    placement: "85%",
  },
  established: "2019",
  accreditation: ["AICTE", "WBSCTE", "ISO 9001:2015"],
  affiliations: ["WBSCTE & VE&SD", "Government of India"],
};

export default function EEDepartmentBanner() {
  const [department, setDepartment] = useState<DepartmentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentInfo = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setDepartment(eeDepartmentData);
      } catch (error) {
        console.error("Failed to fetch department info:", error);
        setDepartment(eeDepartmentData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartmentInfo();
  }, []);

  if (isLoading || !department) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        <div className="absolute inset-0 bg-black/10"></div>
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
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop&crop=center"
          alt="Computer programming and technology"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80"></div>
      </div>

      {/* Government Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.05 8.95-20 20-20s20 8.95 20 20-8.95 20-20 20-20-8.95-20-20zm0-40c0-11.05 8.95-20 20-20s20 8.95 20 20-8.95 20-20 20-20-8.95-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Institutional Header */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">
                  Itahar Government Polytechnic
                </h2>
                <p className="text-white/80 text-sm">
                  WBSCTE & VE&SD, Government of India
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {department.accreditation.map((acc) => (
                <Badge
                  key={acc}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 text-xs"
                >
                  {acc}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Department Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-white/90 text-sm font-medium">
                Est. {department.established}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {department.name}
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto mb-6 rounded-full"></div>

            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              {department.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
              {department.affiliations.map((affiliation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">{affiliation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center p-6 hover:bg-white/10 transition-all duration-300">
              <Users className="h-10 w-10 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {department.stats.students}+
              </div>
              <div className="text-white/70 text-sm font-medium">
                Active Students
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center p-6 hover:bg-white/10 transition-all duration-300">
              <GraduationCap className="h-10 w-10 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {department.stats.faculty}
              </div>
              <div className="text-white/70 text-sm font-medium">
                Expert Faculty
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center p-6 hover:bg-white/10 transition-all duration-300">
              <BookOpen className="h-10 w-10 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {department.stats.programs}
              </div>
              <div className="text-white/70 text-sm font-medium">
                Diploma Programs
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 text-center p-6 hover:bg-white/10 transition-all duration-300">
              <TrendingUp className="h-10 w-10 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {department.stats.placement}
              </div>
              <div className="text-white/70 text-sm font-medium">
                Placement Rate
              </div>
            </Card>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                {department.vision}
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                {department.mission}
              </p>
            </Card>
          </div>

          {/* Key Highlights */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Department Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {department.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-white/90 leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
