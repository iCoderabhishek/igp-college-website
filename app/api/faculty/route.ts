export const dynamic = "force-dynamic";

import { db, storage } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { NextRequest, NextResponse } from "next/server";

// [GET] Fetch all faculties
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "faculties"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ faculties: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch faculties" }, { status: 500 });
  }
}




// [POST] Create a new faculty (using public image URL)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      department,
      designation,
      qualification,
      specialization,
      email,
      phone,
      image, // Now this should be the public image URL
    } = body;

    if (
      !name || !department || !designation ||
      !qualification || !email || !phone || !image
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "faculties"), {
      name,
      department,
      designation,
      qualification,
      specializations: specialization ? [specialization] : [],
      email,
      phone,
      image,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Faculty created", id: docRef.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create faculty" }, { status: 500 });
  }
}



// [PUT] Update a faculty
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Faculty ID is required" }, { status: 400 });
    }

    const ref = doc(db, "faculties", id);
    await updateDoc(ref, updates);

    return NextResponse.json({ message: "Faculty updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update faculty" }, { status: 500 });
  }
}

// [DELETE] Delete a faculty
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Faculty ID is required" }, { status: 400 });
    }

    const ref = doc(db, "faculties", id);
    await deleteDoc(ref);

    return NextResponse.json({ message: "Faculty deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete faculty" }, { status: 500 });
  }
}
