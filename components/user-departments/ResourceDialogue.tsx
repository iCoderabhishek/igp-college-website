"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema definitions
const syllabusSchema = z.object({
  title: z.string().min(1, "Title is required"),
  pdfLink: z.string().url("Must be a valid URL"),
});

const pyqSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.string().min(1, "Year is required"),
  pdfLink: z.string().url("Must be a valid URL"),
});

const additionalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  pdfLink: z.string().url("Must be a valid URL"),
});

// Combined schema for all resource types
const resourceSchema = z.union([syllabusSchema, pyqSchema, additionalSchema]);

type ResourceFormData = z.infer<typeof resourceSchema>;

interface ResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any | null;
  onSave: (data: any) => void;
  isSubmitting: boolean;
  resourceType: "syllabus" | "pyq" | "additional";
  showYear?: boolean;
}

export function ResourceDialog({
  open,
  onOpenChange,
  item,
  onSave,
  isSubmitting,
  resourceType,
  showYear = false,
}: ResourceDialogProps) {
  // Use the appropriate schema based on resource type
  const selectedSchema = resourceType === "pyq" ? pyqSchema : syllabusSchema;

  // Set up the form
  const form = useForm<ResourceFormData>({
    resolver: zodResolver(selectedSchema),
    defaultValues: {
      title: "",
      pdfLink: "",
      ...(resourceType === "pyq" ? { year: "" } : {}),
    },
  });

  // Update form values when item changes
  useEffect(() => {
    if (item) {
      form.reset({
        title: item.title,
        pdfLink: item.pdfLink,
        ...(resourceType === "pyq" ? { year: item.year || "" } : {}),
      });
    } else {
      form.reset({
        title: "",
        pdfLink: "",
        ...(resourceType === "pyq" ? { year: "" } : {}),
      });
    }
  }, [item, form, resourceType]);

  const onSubmit = (data: ResourceFormData) => {
    onSave(data);
  };

  // Dialog title based on operation and resource type
  const getDialogTitle = () => {
    const action = item ? "Edit" : "Add";
    if (resourceType === "syllabus") return `${action} Syllabus`;
    if (resourceType === "pyq") return `${action} Previous Year Question`;
    return `${action} Additional PDF`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="eg, CST 3rd Sem Syllabus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {resourceType === "pyq" && (
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="pdfLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PDF Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/document.pdf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} className="mt-4">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
