"use client";

import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, User, MessageSquare, Star } from "lucide-react";

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

interface MessageModalProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRead: (id: string, status: "read" | "unread") => void;
  onToggleImportant: (id: string, important: boolean) => void;
}

export function MessageModal({
  message,
  isOpen,
  onClose,
  onToggleRead,
  onToggleImportant,
}: MessageModalProps) {
  if (!message) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Message Details
            </h2>
            <Badge
              variant={message.status === "unread" ? "default" : "secondary"}
            >
              {message.status}
            </Badge>
            {message.important && (
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Sender Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-900">
                Sender Information
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <p className="font-medium text-gray-900">{message.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {message.email}
                </p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-900">Subject</span>
            </div>
            <p className="text-lg font-medium text-gray-900 mb-4">
              {message.subject}
            </p>

            <div className="mb-3">
              <span className="font-medium text-gray-900">Message</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>

          {/* Date Information */}
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Received on {formatDate(message.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() =>
                onToggleRead(
                  message.id,
                  message.status === "read" ? "unread" : "read"
                )
              }
            >
              Mark as {message.status === "read" ? "Unread" : "Read"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onToggleImportant(message.id, !message.important)}
            >
              {message.important
                ? "Remove from Important"
                : "Mark as Important"}
            </Button>
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}
