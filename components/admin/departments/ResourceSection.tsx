"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash, FileText, Plus } from "lucide-react";
import { ResourceDialog } from "./ResourceDialogue";
import { toast } from "sonner";

interface ResourceItem {
  id: string;
  title: string;
  pdfLink: string;
  year?: string;
  semester?: string;
  itemType?: string;
  testType?: string;
}

interface ResourceSectionProps {
  title: string;
  resourceType: "syllabus" | "pyq" | "additional";
  emptyMessage: string;
  showYear?: boolean;

  // New props for fetching
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ResourceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: ResourceItem) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/academic-resources?department=${departmentId}&session=${session}&semester=${semester}&type=${resourceType}`
        );
        const data = await res.json();
        setItems(data.resources || []);
      } catch (err) {
        toast.error("Failed to fetch resources");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [departmentId, session, semester, resourceType]);

  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/academic-resources/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete resource");

      // Optimistic update
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Resource deleted successfully");
    } catch (err) {
      toast.error("Failed to delete resource");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (item: ResourceItem) => {
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `/api/academic-resources/${departmentId}?session=${session}&semester=${semester}`,
        {
          method: currentItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...item,
            type: resourceType,
            id: currentItem?.id || undefined,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to save resource");

      const updated = await res.json();
      setItems(updated[resourceType] || []);
      toast.success(`${currentItem ? "Updated" : "Added"} successfully`);
      setIsDialogOpen(false);
    } catch (err) {
      toast.error("Failed to save resource");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" /> Add{" "}
          {resourceType === "pyq"
            ? "PYQ"
            : resourceType === "additional"
            ? "PDF"
            : "Syllabus"}
        </Button>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`} // composite key with index
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    {showYear && item.year && (
                      <p className="text-sm text-muted-foreground">
                        Year: {item.year}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={item.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View PDF
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    disabled={isSubmitting}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ResourceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        item={currentItem}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        resourceType={resourceType}
        showYear={showYear}
      />
    </Card>
  );
}
