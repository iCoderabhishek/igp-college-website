// app/api/courses/[id]/route.ts
import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Helper: Validate course update data
function validateCourseUpdate(data: any) {
  const { title, department, totalIntake, description, coordinator } = data;

  if (title && !title.trim()) throw new Error("Title cannot be empty.");
  if (department && !department.trim()) throw new Error("Department cannot be empty.");
  if (totalIntake && totalIntake <= 0) throw new Error("Total intake must be a positive number.");
  if (description && !description.trim()) throw new Error("Description cannot be empty.");
//   if (coordinator && !coordinator.trim()) throw new Error("Coordinator name cannot be empty.");
}

// DELETE /api/courses/[id]
export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await deleteDoc(doc(db, "courses", id));
  return NextResponse.json({ message: "Deleted successfully" });
}

// PUT /api/courses/[id]
export async function PUT(req: Request, context: any) {
  const { id } = await context.params;
  const body = await req.json();

  try {
    validateCourseUpdate(body);

    await updateDoc(doc(db, "courses", id), {
      ...body,
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 400 });
  }
}
