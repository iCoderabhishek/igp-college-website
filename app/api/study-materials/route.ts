// app/api/study-materials/route.ts
export const dynamic = "force-dynamic";

import { db } from "@/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// [GET] Fetch all study materials
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "study-materials"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ studyMaterials: data });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch study materials" }, { status: 500 });
  }
}

// [POST] Add new study material
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      date,
      important,
      category,
      content,
      department,
      semester,
      publisher,
      link,
    } = await request.json();

    if (!title || !category || !content || !department || !semester || !publisher || !link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "study-materials"), {
      title,
      date,
      important,
      category,
      content,
      department,
      semester,
      publisher,
      link,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Study material added", id: docRef.id });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to add study material" }, { status: 500 });
  }
}
