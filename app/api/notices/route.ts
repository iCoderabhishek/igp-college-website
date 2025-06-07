export const dynamic = "force-dynamic"

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

// [GET] Fetch all notices
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "notices"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ notices: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

// [POST] Create a new notice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, isImportant, noticeLink, createdBy } = body;

    if (!title || !content || !category || typeof isImportant !== "boolean" || !createdBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "notices"), {
      title,
      content,
      category,
      isImportant,
      noticeLink: noticeLink || "",
      createdBy,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Notice created", id: docRef.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}

// [PUT] Update a notice
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Notice ID is required" }, { status: 400 });
    }

    const ref = doc(db, "notices", id);
    await updateDoc(ref, updates);

    return NextResponse.json({ message: "Notice updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

// [DELETE] Delete a notice
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Notice ID is required" }, { status: 400 });
    }

    const ref = doc(db, "notices", id);
    await deleteDoc(ref);

    return NextResponse.json({ message: "Notice deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
