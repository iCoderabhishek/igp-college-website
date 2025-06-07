"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ContinuousEvaluationItem {
  id: string;
  title: string;
  type: "quiz" | "assignment" | "project" | "presentation";
  subject: string;
  dueDate: string;
  maxMarks: number;
  status: "upcoming" | "ongoing" | "completed";
  pdfLink?: string;
  description: string;
  createdAt?: any;
}

interface ContinuousEvaluationSectionProps {
  departmentId: string;
  session: string;
  semester: string;
}

export default function ContinuousEvaluationSection({
  departmentId,
  session,
  semester,
}: ContinuousEvaluationSectionProps) {
  const [items, setItems] = useState<ContinuousEvaluationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContinuousEvaluation = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/academic-resources?department=${departmentId}&session=${session}&semester=${semester}&type=continuous-evaluation`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch continuous evaluation data");
        }

        const data = await res.json();
        setItems(data.resources || []);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to fetch continuous evaluation data");
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (departmentId && session && semester) {
      fetchContinuousEvaluation();
    }
  }, [departmentId, session, semester]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "assignment":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "project":
        return <FileText className="h-5 w-5 text-purple-600" />;
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "border-l-green-500 bg-green-50/50";
      case "assignment":
        return "border-l-blue-500 bg-blue-50/50";
      case "project":
        return "border-l-purple-500 bg-purple-50/50";
      case "presentation":
        return "border-l-orange-500 bg-orange-50/50";
      default:
        return "border-l-gray-500 bg-gray-50/50";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="text-blue-700 border-blue-300 bg-blue-50">
            Upcoming
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="text-orange-700 border-orange-300 bg-orange-50">
            Ongoing
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="text-green-700 border-green-300 bg-green-50"
          >
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // if (isLoading) {
  //   return (
  //     <Card className="shadow-lg border border-gray-200">
  //       <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white">
  //         <CardTitle className="text-lg font-semibold text-gray-800">
  //           Continuous Evaluation Tests
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <div className="space-y-3">
  //           {[1, 2, 3].map((i) => (
  //             <div
  //               key={i}
  //               className="flex items-center space-x-3 p-4 rounded-lg border"
  //             >
  //               <Skeleton className="h-5 w-5 rounded" />
  //               <div className="flex-1 space-y-2">
  //                 <Skeleton className="h-4 w-3/4" />
  //                 <Skeleton className="h-3 w-1/2" />
  //               </div>
  //               <Skeleton className="h-8 w-20" />
  //             </div>
  //           ))}
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  // <Card className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200">
  //   <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-purple-50">
  //     <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
  //       <CheckCircle className="h-5 w-5 text-indigo-600" />
  //       Continuous Evaluation Tests
  //       {items.length > 0 && (
  //         <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
  //           {items.length} {items.length === 1 ? "test" : "tests"}
  //         </span>
  //       )}
  //     </CardTitle>
  //   </CardHeader>
  //   <CardContent>
  //     {items.length === 0 ? (
  //       <div className="text-center py-8">
  //         <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
  //           <CheckCircle className="h-8 w-8 text-indigo-600" />
  //         </div>
  //         <p className="text-gray-500 text-sm">
  //           No continuous evaluation tests available for this semester
  //         </p>
  //       </div>
  //     ) : (
  //       <div className="space-y-4">
  //         {items.map((item, index) => (
  //           <div
  //             key={`${item.id}-${index}`}
  //             className={`group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border-l-4 ${getTypeColor(
  //               item.type
  //             )} hover:shadow-md transition-all duration-200 border border-gray-100`}
  //           >
  //             <div className="flex items-start flex-1 min-w-0 mb-4 sm:mb-0">
  //               <div className="flex-shrink-0 mr-4">
  //                 {getTypeIcon(item.type)}
  //               </div>
  //               <div className="min-w-0 flex-1">
  //                 <div className="flex items-start justify-between mb-2">
  //                   <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
  //                     {item.title}
  //                   </h4>
  //                   {getStatusBadge(item.status)}
  //                 </div>

  //                 <p className="text-sm text-gray-600 mb-3">
  //                   {item.description}
  //                 </p>

  //                 <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
  //                   <span className="inline-flex items-center gap-1">
  //                     <FileText className="h-3 w-3" />
  //                     {item.subject}
  //                   </span>
  //                   <span className="inline-flex items-center gap-1">
  //                     <Calendar className="h-3 w-3" />
  //                     Due: {formatDate(item.dueDate)}
  //                   </span>
  //                   <span className="inline-flex items-center gap-1">
  //                     <Clock className="h-3 w-3" />
  //                     Max Marks: {item.maxMarks}
  //                   </span>
  //                   <Badge variant="outline" className="text-xs capitalize">
  //                     {item.type}
  //                   </Badge>
  //                 </div>
  //               </div>
  //             </div>

  //             {item.pdfLink && (
  //               <div className="flex-shrink-0 sm:ml-4">
  //                 <a
  //                   href={item.pdfLink}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  //                 >
  //                   <Download className="h-4 w-4 mr-2" />
  //                   View Details
  //                 </a>
  //               </div>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </CardContent>
  // </Card>
}
