import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Helper: Validate project update data
function validateProjectUpdate(data: any) {
  const { title, description, tags, githubLink, liveLink } = data;

  if (title && !title.trim()) throw new Error("Title cannot be empty.");
  if (description && !description.trim()) throw new Error("Description cannot be empty.");
  if (tags && (!Array.isArray(tags) || tags.length === 0)) throw new Error("Tags must be a non-empty array.");
  if (githubLink && !isValidURL(githubLink)) throw new Error("Invalid GitHub link.");
  if (liveLink && !isValidURL(liveLink)) throw new Error("Invalid live site link.");
}

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// DELETE /api/projects/[id]
export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await deleteDoc(doc(db, "projects", id));
  return NextResponse.json({ message: "Deleted successfully" });
}

// PUT /api/projects/[id]
export async function PUT(req: Request, context: any) {
  const { id } = context.params;
  const body = await req.json();

  try {
    validateProjectUpdate(body);

    await updateDoc(doc(db, "projects", id), {
      ...body,
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 400 });
  }
}
