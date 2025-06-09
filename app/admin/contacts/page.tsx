"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  Calendar,
  Star,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  Filter,
  RefreshCw,
  Archive,
  MoreVertical,
} from "lucide-react";
import { MessageModal } from "@/components/ui/message-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "read" | "unread";
  important: boolean;
}

export default function ContactsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"createdAt" | "name">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleSort = (field: "createdAt" | "name") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedMessages = messages
    .filter((message) => {
      const matchesSearch =
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || message.status === selectedStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/contact");
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        const formatted: Message[] = json.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          subject: item.subject,
          message: item.message,
          createdAt: item.createdAt || new Date().toISOString(),
          status: item.status || "unread",
          important: item.important || false,
        }));

        setMessages(formatted);
      } else {
        setError("Failed to load messages");
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: "read" | "unread") => {
    try {
      setUpdating(id);
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setMessages(
          messages.map((msg) => (msg.id === id ? { ...msg, status } : msg))
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("Failed to update message status:", err);
      setError("Failed to update message status");
    } finally {
      setUpdating(null);
    }
  };

  const updateMessageImportant = async (id: string, important: boolean) => {
    try {
      setUpdating(id);
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ important }),
      });

      if (res.ok) {
        setMessages(
          messages.map((msg) => (msg.id === id ? { ...msg, important } : msg))
        );
      } else {
        throw new Error("Failed to update importance");
      }
    } catch (err) {
      console.error("Failed to update message importance:", err);
      setError("Failed to update message importance");
    } finally {
      setUpdating(null);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      setUpdating(id);
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
      setError("Failed to delete message");
    } finally {
      setUpdating(null);
    }
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (message.status === "unread") {
      updateMessageStatus(message.id, "read");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = messages.filter((msg) => msg.status === "unread").length;
  const totalCount = messages.length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contact Messages
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and respond to contact form submissions
            </p>
          </div>
          <Button
            onClick={fetchMessages}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 mt-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-blue-600">Total Messages: </span>
            <span className="font-semibold text-blue-800">{totalCount}</span>
          </div>
          <div className="bg-orange-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-orange-600">Unread: </span>
            <span className="font-semibold text-orange-800">{unreadCount}</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search messages by name, email, subject, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[140px]"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-sm border">
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : filteredAndSortedMessages.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No messages found</p>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject & Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                      onClick={() => toggleSort("createdAt")}
                    >
                      <span>Date</span>
                      {sortField === "createdAt" &&
                        (sortOrder === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredAndSortedMessages.map((message) => (
                    <motion.tr
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={cn(
                        "hover:bg-gray-50 transition-colors",
                        message.status === "unread" && "bg-blue-50/50"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          {message.important && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current mt-1 flex-shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 truncate">
                              {message.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{message.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <div className="font-medium text-gray-900 truncate mb-1">
                            {message.subject}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {message.message}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="whitespace-nowrap">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            message.status === "unread"
                              ? "default"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {message.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewMessage(message)}
                            disabled={updating === message.id}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={updating === message.id}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  updateMessageStatus(
                                    message.id,
                                    message.status === "read"
                                      ? "unread"
                                      : "read"
                                  )
                                }
                              >
                                Mark as{" "}
                                {message.status === "read" ? "Unread" : "Read"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateMessageImportant(
                                    message.id,
                                    !message.important
                                  )
                                }
                              >
                                {message.important
                                  ? "Remove from Important"
                                  : "Mark as Important"}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteMessage(message.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Modal */}
      <MessageModal
        message={selectedMessage}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }}
        onToggleRead={updateMessageStatus}
        onToggleImportant={updateMessageImportant}
      />
    </div>
  );
}
