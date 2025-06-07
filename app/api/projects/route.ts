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
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// [POST] Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, link, department, teamMembers, projectImage } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "projects"), {
      title,
      content,
      category,
      link: link || "",
      department: department || "",
      teamMembers: teamMembers || [],
      projectImage: projectImage || "", // ✅ New field added
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ docRef });
  } catch (error) {
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

    const ref = doc(db, "projects", id);
    await updateDoc(ref, updates); // ✅ Supports projectImage if included in updates

    return NextResponse.json({ message: "Project updated" });
  } catch (error) {
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

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
