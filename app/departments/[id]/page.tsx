import AdminAcademicData from "@/components/admin/departments/AdminAcademicData";
import { Skeleton } from "@/components/ui/skeleton";
import UserAcademicData from "@/components/user-departments/UserAcademicData";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="p-6">
            <Skeleton className="h-[600px] w-full" />
          </div>
        }
      >
        <UserAcademicData />
      </Suspense>
    </div>
  );
};

export default page;
