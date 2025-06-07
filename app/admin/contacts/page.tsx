"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Mail,
  Calendar,
  Star,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Dummy contact messages data
const messages = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    subject: "Admission Query for CST",
    message:
      "I would like to know about the admission process for Computer Science & Technology diploma program. What are the eligibility criteria and important dates?",
    date: "2024-03-15T10:30:00",
    status: "unread",
    important: true,
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    subject: "Regarding Electrical Engineering Lab Facilities",
    message:
      "I am interested in knowing more about the laboratory facilities available for Electrical Engineering students. What kind of practical exposure do students get?",
    date: "2024-03-14T15:45:00",
    status: "read",
    important: false,
  },
  {
    id: 3,
    name: "Mohammed Ali",
    email: "mohammed.ali@example.com",
    subject: "Query about Hostel Facilities",
    message:
      "Could you please provide information about hostel facilities and accommodation charges for outstation students?",
    date: "2024-03-14T09:15:00",
    status: "read",
    important: true,
  },
  {
    id: 4,
    name: "Anjali Sharma",
    email: "anjali.sharma@example.com",
    subject: "Placement Related Query",
    message:
      "I would like to know about the placement statistics of the last few years and which companies visit the campus for recruitment.",
    date: "2024-03-13T14:20:00",
    status: "read",
    important: false,
  },
];

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"date" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleSort = (field: "date" | "name") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedMessages = messages
    .filter(
      (message) =>
        (message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedStatus === "all" || message.status === selectedStatus)
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
        <p className="text-gray-600">
          Manage and respond to contact form submissions
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => toggleSort("name")}
                  >
                    <span>Sender</span>
                    {sortField === "name" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      ))}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => toggleSort("date")}
                  >
                    <span>Date</span>
                    {sortField === "date" &&
                      (sortOrder === "asc" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      ))}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedMessages.map((message) => (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={message.status === "unread" ? "bg-blue-50" : ""}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 flex items-center">
                        {message.important && (
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        )}
                        {message.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {message.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {message.subject}
                      </div>

                      <div className="text-sm text-gray-500 line-clamp-1">
                        {message.message}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(message.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-primary/80">
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
