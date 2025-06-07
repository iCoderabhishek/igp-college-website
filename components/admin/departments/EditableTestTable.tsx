"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Test {
  id: string;
  subject: string;
  testType: string;
  examDate: string;
  questions?: string;
}

interface EditableTestTableProps {
  tests: Test[];
  onUpdate: (tests: Test[]) => void;
}

export default function EditableTestTable({
  tests,
  onUpdate,
}: EditableTestTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTest, setEditedTest] = useState<Test | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTest, setNewTest] = useState<Omit<Test, "id">>({
    subject: "",
    testType: "",
    examDate: "",
    questions: "",
  });

  const handleEdit = (test: Test) => {
    setEditingId(test.id);
    setEditedTest({ ...test });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTest(null);
  };

  const handleSaveEdit = () => {
    if (editedTest) {
      const updatedTests = tests.map((test) =>
        test.id === editingId ? editedTest : test
      );
      onUpdate(updatedTests);
      setEditingId(null);
      setEditedTest(null);
      toast.success("Test updated successfully");
    }
  };

  const handleDelete = (id: string) => {
    const updatedTests = tests.filter((test) => test.id !== id);
    onUpdate(updatedTests);
    toast.success("Test deleted successfully");
  };

  const handleInputChange = (field: keyof Test, value: string) => {
    if (editedTest) {
      setEditedTest({ ...editedTest, [field]: value });
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewTest({
      subject: "",
      testType: "",
      examDate: "",
      questions: "",
    });
  };

  const handleSaveNew = () => {
    // Validate required fields
    if (!newTest.subject || !newTest.testType || !newTest.examDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const testToAdd = {
      id: Date.now().toString(),
      ...newTest,
    };

    onUpdate([...tests, testToAdd]);
    setIsAddingNew(false);
    setNewTest({
      subject: "",
      testType: "",
      examDate: "",
      questions: "",
    });
    toast.success("New test added successfully");
  };

  const handleNewTestChange = (
    field: keyof Omit<Test, "id">,
    value: string
  ) => {
    setNewTest({ ...newTest, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Continuous Evaluation Tests</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddNew}
          disabled={isAddingNew}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Test
        </Button>
      </CardHeader>
      <CardContent>
        {tests.length === 0 && !isAddingNew ? (
          <p className="text-muted-foreground text-center py-4">
            No tests available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">SL No</th>
                  <th className="text-left py-3 px-4 font-medium">Subject</th>
                  <th className="text-left py-3 px-4 font-medium">Test Type</th>
                  <th className="text-left py-3 px-4 font-medium">Exam Date</th>
                  <th className="text-left py-3 px-4 font-medium">Questions</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test, index) => (
                  <tr key={test.id} className="border-b hover:bg-muted/50">
                    {editingId === test.id ? (
                      // Editing state
                      <>
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">
                          <Input
                            value={editedTest?.subject || ""}
                            onChange={(e) =>
                              handleInputChange("subject", e.target.value)
                            }
                            className="w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            value={editedTest?.testType || ""}
                            onChange={(e) =>
                              handleInputChange("testType", e.target.value)
                            }
                            className="w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            type="date"
                            value={editedTest?.examDate || ""}
                            onChange={(e) =>
                              handleInputChange("examDate", e.target.value)
                            }
                            className="w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Input
                            value={editedTest?.questions || ""}
                            onChange={(e) =>
                              handleInputChange("questions", e.target.value)
                            }
                            placeholder="URL to questions (optional)"
                            className="w-full"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleSaveEdit}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleCancelEdit}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </>
                    ) : (
                      // Display state
                      <>
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{test.subject}</td>
                        <td className="py-3 px-4">{test.testType}</td>
                        <td className="py-3 px-4">{test.examDate}</td>
                        <td className="py-3 px-4">
                          {test.questions ? (
                            <a
                              href={test.questions}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              View Questions
                            </a>
                          ) : (
                            <span className="text-muted-foreground">
                              Not available
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(test)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(test.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}

                {/* Add new row */}
                {isAddingNew && (
                  <tr className="border-b bg-muted/30">
                    <td className="py-3 px-4">{tests.length + 1}</td>
                    <td className="py-3 px-4">
                      <Input
                        value={newTest.subject}
                        onChange={(e) =>
                          handleNewTestChange("subject", e.target.value)
                        }
                        placeholder="Enter subject"
                        className="w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        value={newTest.testType}
                        onChange={(e) =>
                          handleNewTestChange("testType", e.target.value)
                        }
                        placeholder="E.g., Mid-term"
                        className="w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="date"
                        value={newTest.examDate}
                        onChange={(e) =>
                          handleNewTestChange("examDate", e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        value={newTest.questions || ""}
                        onChange={(e) =>
                          handleNewTestChange("questions", e.target.value)
                        }
                        placeholder="URL (optional)"
                        className="w-full"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleSaveNew}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCancelAdd}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
