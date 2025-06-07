"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calendar, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ResourceItem {
  id: string;
  title: string;
  pdfLink: string;
  year?: string;
  semester?: string;
  itemType?: string;
  testType?: string;
  createdAt?: any;
}

interface ResourceSectionProps {
  title: string;
  resourceType: "syllabus" | "pyq" | "additional";
  emptyMessage: string;
  showYear?: boolean;
  departmentId: string;
  session: string;
  semester: string;
}

export default function ResourceSection({
  title,
  emptyMessage,
  resourceType,
  showYear = false,
  departmentId,
  session,
  semester,
}: ResourceSectionProps) {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/academic-resources?department=${departmentId}&session=${session}&semester=${semester}&type=${resourceType}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch resources");
        }

        const data = await res.json();
        setItems(data.resources || []);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch resources");
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (departmentId && session && semester) {
      fetchItems();
    }
  }, [departmentId, session, semester, resourceType]);

  const getResourceIcon = () => {
    switch (resourceType) {
      case "syllabus":
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case "pyq":
        return <FileText className="h-5 w-5 text-green-600" />;
      case "additional":
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getResourceColor = () => {
    switch (resourceType) {
      case "syllabus":
        return "border-l-blue-500 bg-blue-50/50";
      case "pyq":
        return "border-l-green-500 bg-green-50/50";
      case "additional":
        return "border-l-purple-500 bg-purple-50/50";
      default:
        return "border-l-gray-500 bg-gray-50/50";
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-4 rounded-lg border"
              >
                <Skeleton className="h-5 w-5 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2 ">
          {getResourceIcon()}
          {title}
          {items.length > 0 && (
            <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {getResourceIcon()}
            </div>
            <p className="text-gray-500 text-md">{emptyMessage}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`group flex items-center justify-between p-4 rounded-lg border-l-4 ${getResourceColor()} hover:shadow-sm transition-all duration-200 border border-gray-100`}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0 mr-4">{getResourceIcon()}</div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      {showYear && item.year && (
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.year}
                        </span>
                      )}
                      {item.createdAt && (
                        <span className="text-xs text-gray-500">
                          Added{" "}
                          {new Date(
                            item.createdAt.seconds * 1000
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <a
                    href={item.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
