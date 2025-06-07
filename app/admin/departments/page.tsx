"use client";

import { Suspense } from "react";
import AdminAcademicData from "@/components/admin/departments/AdminAcademicData";
import { Skeleton } from "@/components/ui/skeleton";
import DepartmentCard from "@/components/admin/departments/DepartmentCard";
import { ArrowRightIcon } from "lucide-react";

export default function DepartmentAdminPage() {
  return (
    <div>
      <header className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Department Administration</h1>
      </header>

      <DepartmentCard />
    </div>
  );
}
