"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import VisitorChart from "@/components/admin/charts/VisitorChart";
import DeviceDistributionChart from "@/components/admin/charts/DeviceDistributionChart";
import PagePopularityChart from "@/components/admin/charts/PagePopularityChart";
import WeeklyTrafficChart from "@/components/admin/charts/WeeklyTrafficChart";
import { useEffect, useState } from "react";
import { auth } from "@/firebase"; // Import auth from your initialized firebase config

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import QuickLinks from "@/components/admin/QuickLinks";

// Dummy data for summary cards
const summaryData = {
  activeNotices: 12,
  studentProjects: 45,
  studyMaterials: 78,
  contactMessages: 23,
};

// Dummy data for visitor stats
const visitorStats = {
  dailyVisitors: 150,
  weeklyVisitors: 876,
  monthlyVisitors: 3245,
  yearlyVisitors: 28654,
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        // Redirect first, then set loading
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) return null;
  return (
    <div className="px-4 py-6 md:px-6">
      {user && (
        <>
          {/* Page Title */}
          <div className="mb-8 mt-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome to Itahar Government Polytechnic admin panel
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {summaryData.activeNotices}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm">Active Notices</h3>
              <div className="mt-2">
                <span className="text-green-500 text-xs font-medium">
                  +2 new
                </span>
                <span className="text-gray-400 text-xs ml-1">
                  since yesterday
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {summaryData.studentProjects}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm">Student Projects</h3>
              <div className="mt-2">
                <span className="text-green-500 text-xs font-medium">
                  +5 new
                </span>
                <span className="text-gray-400 text-xs ml-1">this week</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {summaryData.studyMaterials}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm">Study Materials</h3>
              <div className="mt-2">
                <span className="text-green-500 text-xs font-medium">
                  +12 new
                </span>
                <span className="text-gray-400 text-xs ml-1">this month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {summaryData.contactMessages}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm">Contact Messages</h3>
              <div className="mt-2">
                <span className="text-green-500 text-xs font-medium">
                  +3 new
                </span>
                <span className="text-gray-400 text-xs ml-1">today</span>
              </div>
            </motion.div>
          </div>

          <QuickLinks />
        </>
      )}
    </div>
  );
}
