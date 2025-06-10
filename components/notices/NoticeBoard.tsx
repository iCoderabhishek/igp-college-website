import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  FileText,
  Calendar,
} from "lucide-react";
import NoticeCard from "./NoticeCard";
import NoticeModal from "@/components/notices/Modal";
import { Notice, NoticeResponse } from "@/types/notice";

const categories = [
  "All",
  "General",
  "Events",
  "Exams",
  "Urgent",
  "Admission",
  "admission-opens",
];

export default function NoticeBoard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // For demo purposes, using mock data based on your backend response
        const mockData: NoticeResponse = {
          notices: [
            {
              id: "5SDJLONarASjR61Gk4ql",
              content:
                "This is admission notice with detailed information about the upcoming admission process. Please read carefully and follow all instructions.",
              createdAt: {
                seconds: 1748935196,
                nanoseconds: 37000000,
              },
              category: "Admission",
              title: "New Admission Notice 2025",
              noticeLink: "https://example.com/notice.pdf",
              createdBy: "abhishekjha1431@gmail.com",
              isImportant: false,
            },
            {
              id: "Bv0oX6p0LUt3mwQf3rWh",
              isImportant: true,
              content:
                "Important event announcement - Annual function will be held on campus. All students are required to attend.",
              noticeLink: "https://example.com/event.pdf",
              createdBy: "abhishekjha1431@gmail.com",
              category: "Events",
              title: "Annual Function - Mandatory Attendance",
              createdAt: {
                seconds: 1746384322,
                nanoseconds: 865000000,
              },
              date: "2025-05-05",
            },
            {
              id: "MGFCMpMkF1nwI7oPx4Uh",
              isImportant: false,
              createdBy: "abhishekjha1431@gmail.com",
              content:
                "General notice regarding academic calendar updates and examination schedule changes.",
              noticeLink: "https://example.com/academic.pdf",
              createdAt: {
                seconds: 1746382476,
                nanoseconds: 572000000,
              },
              category: "General",
              title: "Academic Calendar Updates",
            },
            {
              id: "lx8ErOecmAsDb2PItFGl",
              noticeLink: "https://webscte.co.in/",
              createdBy: "abhishekjha1431@gmail.com",
              createdAt: {
                seconds: 1746342921,
                nanoseconds: 150000000,
              },
              category: "admission-opens",
              title: "Online Admissions Portal Now Live",
              isImportant: true,
              date: "2025-05-05",
              content:
                "The online admission portal is now active. Students can apply for various courses through our official website.",
            },
          ],
        };

        setNotices(mockData.notices);
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleShowMore = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  // Filter notices based on search term and selected category
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const importantNotices = filteredNotices.filter(
    (notice) => notice.isImportant
  );
  const regularNotices = filteredNotices.filter(
    (notice) => !notice.isImportant
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notices...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Notice Board
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Stay updated with important announcements, events, and
              notifications
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notices by title or content..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-64 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Showing {filteredNotices.length} notice
              {filteredNotices.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </div>

        {/* Important Notices Section */}
        {importantNotices.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Important Notices
              </h2>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {importantNotices.length}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {importantNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onShowMore={() => handleShowMore(notice)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Notices Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">All Notices</h2>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {regularNotices.length}
            </span>
          </div>

          {regularNotices.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onShowMore={() => handleShowMore(notice)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notices found
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search criteria or filters."
                  : "No notices have been posted yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notice Modal */}
      <NoticeModal
        //@ts-ignore
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
