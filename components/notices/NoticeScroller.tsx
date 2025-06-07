"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  createdAt: string;
  isImportant: boolean;
};

export default function NoticeScroller({ limit = 0 }: { limit?: number }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch("/api/notices"); // Your actual endpoint
        const json = await res.json();

        // Extract the notices array from the response
        const notices = json.notices;

        const formatted = limit > 0 ? notices.slice(0, limit) : notices;
        setNotices(formatted);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      }
    };

    fetchNotices();
  }, [limit]);

  const formatDate = (notice: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    if (notice.date) {
      return new Date(notice.date).toLocaleDateString(undefined, options);
    }

    if (notice.createdAt?.seconds) {
      return new Date(notice.createdAt.seconds * 1000).toLocaleDateString(
        undefined,
        options
      );
    }

    return "Unknown Date";
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const scrollElement = scrollContainerRef.current;
    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          scrollElement &&
          !paused &&
          scrollElement.scrollTop <
            scrollElement.scrollHeight - scrollElement.clientHeight
        ) {
          scrollElement.scrollTop += 1;
        } else if (scrollElement && !paused) {
          scrollElement.scrollTop = 0;
        }
      }, 50);
    };

    startScroll();

    return () => {
      clearInterval(scrollInterval);
    };
  }, [paused]);

  return (
    <div
      className="relative max-h-[400px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto pr-2 max-h-[400px] scroll-smooth"
      >
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-4 p-3 rounded-lg border ${
              notice.isImportant
                ? "border-primary/30 bg-primary/5"
                : "border-gray-200"
            }`}
          >
            <h3
              className={`font-medium mb-2 ${
                notice.isImportant ? "text-primary" : "text-gray-800"
              }`}
            >
              {notice.isImportant && (
                <span className="inline-block bg-primary text-white text-xs px-2 py-0.5 rounded mr-2">
                  Important
                </span>
              )}
              {notice.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm">
              <CalendarClock className="h-3.5 w-3.5 mr-1" />
              <span>{formatDate(notice)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}
