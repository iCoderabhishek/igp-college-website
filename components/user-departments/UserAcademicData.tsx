"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceSection from "./ResourceSection";
// import EditableTestTable from "./EditableTestTable";
// import ContinuousEvaluationSection from "@/components/user-departments/ContinuousEvaluation";
import LabsAndFacilitiesSection from "@/components/user-departments/Facilities";
import DepartmentBanner from "@/components/user-departments/DepartmentBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { SemesterData } from "@/types/academic";
import { ArrowLeft, GraduationCap, BookOpen, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import CSTDepartmentBanner from "./CSTBanner";
import EEDepartmentBanner from "./EEDeptBanner";
import ETCEDepartmentBanner from "./ETCEDept";

// Academic sessions data
const academicSessions = ["2024-25", "2023-24", "2022-23"];

// Mock initial data structure updated for sessions
const initialSemesterData: Record<string, Record<string, SemesterData>> = {
  "2024-25": {
    "3rd": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "4th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "5th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "6th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
  },
  "2023-24": {
    "3rd": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "4th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "5th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "6th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
  },
  "2022-23": {
    "3rd": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "4th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "5th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
    "6th": {
      syllabusItems: [],
      pyqItems: [],
      additionalPdfs: [],
      tests: [],
      continuousEvaluation: [],
      isLoading: false,
    },
  },
};

export default function UserAcademicData() {
  const [semesterData, setSemesterData] =
    useState<Record<string, Record<string, SemesterData>>>(initialSemesterData);
  const [activeSession, setActiveSession] = useState(academicSessions[0]);
  const [activeSemester, setActiveSemester] = useState("3rd");
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const departmentId = params?.id as string;

  useEffect(() => {
    const fetchAcademicData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/academic-resources/${departmentId}?session=${activeSession}&semester=${activeSemester}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch academic data");
        }

        const json = await res.json();

        // Directly access the data by keys
        const syllabusItems = json.syllabus || [];
        const pyqItems = json.pyqs || [];
        const additionalPdfs = json.additional || [];
        const tests = json.tests || [];
        const continuousEvaluation = json.continuousEvaluation || [];

        setSemesterData((prev) => ({
          ...prev,
          [activeSession]: {
            ...prev[activeSession],
            [activeSemester]: {
              syllabusItems,
              pyqItems,
              additionalPdfs,
              tests,
              continuousEvaluation,
              isLoading: false,
            },
          },
        }));
      } catch (err) {
        console.error("Failed to fetch academic data", err);
        // Set empty data on error
        setSemesterData((prev) => ({
          ...prev,
          [activeSession]: {
            ...prev[activeSession],
            [activeSemester]: {
              syllabusItems: [],
              pyqItems: [],
              additionalPdfs: [],
              tests: [],
              continuousEvaluation: [],
              isLoading: false,
            },
          },
        }));
      } finally {
        setIsLoading(false);
      }
    };

    if (departmentId && activeSession && activeSemester) {
      fetchAcademicData();
    }
  }, [activeSession, activeSemester, departmentId]);

  const handleSessionChange = (session: string) => {
    setActiveSession(session);
    setActiveSemester("3rd");
  };

  const handleSemesterChange = (semester: string) => {
    setActiveSemester(semester);
  };

  // Update functions for each section (keeping for EditableTestTable compatibility)
  const updateTests = async (tests: any[]) => {
    setSemesterData((prev) => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        [activeSemester]: {
          ...prev[activeSession][activeSemester],
          tests,
        },
      },
    }));

    // Sync with backend
    await fetch(`/api/academic-resources/${departmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session: activeSession,
        semester: activeSemester,
        type: "tests",
        data: tests,
        departmentId,
      }),
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const currentData = semesterData[activeSession][activeSemester];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {departmentId === "cst" && <CSTDepartmentBanner />}
      {departmentId === "ee" && <EEDepartmentBanner />}
      {departmentId === "etce" && <ETCEDepartmentBanner />}

      {/* Labs and Facilities Section */}
      <LabsAndFacilitiesSection departmentId={departmentId} />

      <div className="container mx-auto px-4 py-12">
        {/* Academic Resources Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Academic Resources
                </h1>
                <p className="text-gray-600 text-lg">
                  Access comprehensive course materials and study resources
                </p>
              </div>
            </div>
            <a
              href="/departments"
              className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Departments</span>
            </a>
          </div>

          {/* Academic Session Selection */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-semibold text-gray-700">
                Academic Session
              </span>
            </div>
            <Tabs value={activeSession} onValueChange={handleSessionChange}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-50 p-1 rounded-xl">
                {academicSessions.map((session) => (
                  <TabsTrigger
                    key={session}
                    value={session}
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg font-medium"
                  >
                    {session}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Semester Selection */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-gray-500" />
              <span className="text-lg font-semibold text-gray-700">
                Semester
              </span>
            </div>
            <Tabs value={activeSemester} onValueChange={handleSemesterChange}>
              <TabsList className="grid w-full grid-cols-4 md:mr-4 sm:m r-4 bg-gray-50 p-1 rounded-xl text-lg">
                <TabsTrigger
                  value="3rd"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  3rd Semester
                </TabsTrigger>
                <TabsTrigger
                  value="4th"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  4th Semester
                </TabsTrigger>
                <TabsTrigger
                  value="5th"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  5th Semester
                </TabsTrigger>
                <TabsTrigger
                  value="6th"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg font-medium"
                >
                  6th Semester
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-8">
          {currentData.isLoading ? (
            <SectionLoadingState />
          ) : (
            <>
              <ResourceSection
                title="Course Syllabus"
                emptyMessage="No syllabus documents available for this semester"
                resourceType="syllabus"
                departmentId={departmentId}
                session={activeSession}
                semester={activeSemester}
              />

              <ResourceSection
                title="Previous Year Questions (PYQs)"
                emptyMessage="No previous year questions available for this semester"
                resourceType="pyq"
                showYear
                departmentId={departmentId}
                session={activeSession}
                semester={activeSemester}
              />

              {/* <ContinuousEvaluationSection
                departmentId={departmentId}
                session={activeSession}
                semester={activeSemester}
              /> */}

              <ResourceSection
                title="Continuous Evaluation Tests"
                emptyMessage="No continuous evaluation tests available for this semester"
                resourceType="additional"
                departmentId={departmentId}
                session={activeSession}
                semester={activeSemester}
              />

              <ResourceSection
                title="Assignments"
                emptyMessage="No assignments available for this semester"
                resourceType="additional"
                departmentId={departmentId}
                session={activeSession}
                semester={activeSemester}
              />
              <ResourceSection
                title="Additional Study Materials"
                emptyMessage="No additional study materials available for this semester"
                resourceType="additional"
                departmentId={departmentId}
                session={activeSession}
                semester={activeSemester}
              />

              {/* <EditableTestTable
                tests={currentData.tests}
                onUpdate={updateTests}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading states
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-10">
          <div className="flex items-center gap-6 mb-8">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-8 w-80 mb-3" />
              <Skeleton className="h-5 w-96" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>

        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between p-6 border rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-6 w-6" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-64" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionLoadingState() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="flex items-center justify-between p-6 border rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-6" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
