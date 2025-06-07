"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, CalendarClock, AlertTriangle, FileText } from "lucide-react";
import Image from "next/image";

type Notice = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  createdBy: string;
  isImportant: boolean;
  noticeLink?: string;
};
const categories = ["All", "General", "Events", "Exams", "Urgent"];

export default function Notices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices");
        const data = await res.json();
        setNotices(data.notices); // ✅ correctly sets an array
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  if (loading) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-gray-500">Loading notices...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16 md:pt-20">
      {/* Banner with Background Image and Animation */}
      <div
        className="relative bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/notice-banner.png')", opacity: 50 }} // Replace with actual image path
      >
        {/* Overlay Icon (semi-transparent layer) */}
        <Image
          src="/home-overly.png"
          alt="Notice Overlay"
          width={240}
          height={240}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 z-10 pointer-events-none"
        />

        {/* Animated Heading & Subtitle */}
        <div className="relative z-20 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Notice Board
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
              Stay updated with important announcements, events, and
              notifications
            </p>
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notices..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Important Notices Highlight */}
        {filteredNotices.some((notice) => notice.isImportant) && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-primary mr-2" />
              Important Notices
            </h2>
            <div className="space-y-4">
              {filteredNotices
                .filter((notice) => notice.isImportant)
                .map((notice) => (
                  <motion.div
                    key={notice.id}
                    className="bg-primary/5 border border-primary/30 rounded-lg p-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="font-semibold text-primary flex items-center">
                        <span className="inline-block bg-primary text-white text-xs px-2 py-0.5 rounded mr-2">
                          Important
                        </span>
                        {notice.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1 md:mt-0">
                        <CalendarClock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(notice.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                      <button
                        onClick={() =>
                          setExpandedNoticeId(
                            expandedNoticeId === notice.id ? null : notice.id
                          )
                        }
                        className="text-primary text-sm hover:underline"
                      >
                        {expandedNoticeId === notice.id
                          ? "Show Less"
                          : "Read More"}
                        <a
                          href={notice.noticeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download PDF
                        </a>
                      </button>
                    </div>
                    {expandedNoticeId === notice.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-700 border-t pt-2"
                      >
                        {notice.content}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FileText className="h-5 w-5 text-primary mr-2" />
            All Notices
          </h2>

          {filteredNotices.length > 0 ? (
            <div className="space-y-4">
              {filteredNotices
                .filter((notice) => !notice.isImportant)
                .map((notice) => (
                  <motion.div
                    key={notice.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {notice.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1 md:mt-0">
                        <CalendarClock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(notice.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                        {notice.category}
                      </span>
                      <button
                        onClick={() =>
                          setExpandedNoticeId(
                            expandedNoticeId === notice.id ? null : notice.id
                          )
                        }
                        className="text-primary text-sm hover:underline"
                      >
                        {expandedNoticeId === notice.id
                          ? "Show Less"
                          : "Read More"}
                      </button>
                    </div>
                    {expandedNoticeId === notice.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-700 border-t pt-2"
                      >
                        {notice.content}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No notices found matching your criteria.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
