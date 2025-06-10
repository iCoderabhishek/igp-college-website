import React from "react";
import { CalendarDays, ExternalLink, AlertTriangle, User } from "lucide-react";
import { Notice } from "@/types/notice";

interface NoticeCardProps {
  notice: Notice | any;
  onShowMore: () => void;
}

export default function NoticeCard({ notice, onShowMore }: NoticeCardProps) {
  const formatDate = (createdAt: Notice["createdAt"]) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let date: Date;

    if (typeof createdAt === "string") {
      date = new Date(createdAt);
    } else if (createdAt?.seconds) {
      date = new Date(createdAt.seconds * 1000);
    } else {
      return "Invalid Date";
    }

    return date.toLocaleDateString(undefined, options);
  };

  const handleViewPDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notice.noticeLink) {
      window.open(notice.noticeLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
        notice.isImportant
          ? "border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={onShowMore}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {notice.isImportant && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  <AlertTriangle className="h-3 w-3" />
                  Important
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {notice.category}
              </span>
            </div>
            <h3
              className={`text-lg font-semibold leading-tight ${
                notice.isImportant ? "text-amber-900" : "text-gray-900"
              }`}
            >
              {notice.title}
            </h3>
          </div>
        </div>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {notice.content.length > 120
            ? `${notice.content.substring(0, 120)}...`
            : notice.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{formatDate(notice.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>{notice.createdBy.split("@")[0]}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notice.noticeLink && (
              <button
                onClick={handleViewPDF}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                View PDF
              </button>
            )}
            <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Show More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
