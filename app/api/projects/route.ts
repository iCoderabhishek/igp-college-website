export const dynamic = "force-dynamic";

import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// [GET] Fetch all projects
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ projects: data });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// [POST] Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, link, department, teamMembers, projectImage, date, important } = body;

    // Validate required fields
    if (!title || !content || !department) {
      return NextResponse.json({ 
        error: "Missing required fields: title, content, and department are required" 
      }, { status: 400 });
    }

    if (!Array.isArray(category) || category.length === 0) {
      return NextResponse.json({ 
        error: "At least one category must be selected" 
      }, { status: 400 });
    }

    const projectData = {
      title: title.trim(),
      content: content.trim(),
      category: category || [],
      link: link || "",
      department: department.trim(),
      teamMembers: teamMembers || [],
      projectImage: projectImage || "",
      date: date || new Date().toISOString().slice(0, 10),
      important: important || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "projects"), projectData);

    return NextResponse.json({ 
      message: "Project created successfully",
      id: docRef.id 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

// [PUT] Update a project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    // Prepare update data
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const ref = doc(db, "projects", id);
    await updateDoc(ref, updateData);

    return NextResponse.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// [DELETE] Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const ref = doc(db, "projects", id);
    await deleteDoc(ref);

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}