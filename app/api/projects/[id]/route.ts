import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

// Helper: Validate project update data
function validateProjectUpdate(data: any) {
  const { title, content, category, link, department, teamMembers, projectImage } = data;

  if (title && !title.trim()) {
    throw new Error("Title cannot be empty.");
  }
  if (content && !content.trim()) {
    throw new Error("Content cannot be empty.");
  }
  if (department && !department.trim()) {
    throw new Error("Department cannot be empty.");
  }
  if (category && (!Array.isArray(category) || category.length === 0)) {
    throw new Error("At least one category must be selected.");
  }
  if (link && link.trim() && !isValidURL(link)) {
    throw new Error("Invalid project link URL.");
  }
  if (projectImage && projectImage.trim() && !isValidURL(projectImage)) {
    throw new Error("Invalid project image URL.");
  }
  if (teamMembers && !Array.isArray(teamMembers)) {
    throw new Error("Team members must be an array.");
  }
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
  try {
    const { id } = context.params;
    
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    await deleteDoc(doc(db, "projects", id));
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(req: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Validate the update data
    validateProjectUpdate(body);

    // Prepare update data
    const updateData = {
      ...body,
      updatedAt: serverTimestamp(),
    };

    // Remove undefined values and the id field
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || key === 'id') {
        delete updateData[key];
      }
    });

    await updateDoc(doc(db, "projects", id), updateData);

    return NextResponse.json({ 
      message: "Project updated successfully",
      id: id,
      ...body
    });
  } catch (error: any) {
    console.error("Error updating project:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to update project" 
    }, { status: 400 });
  }
}