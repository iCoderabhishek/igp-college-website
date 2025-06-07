// app/api/courses/route.ts
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// [GET] Fetch all courses
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "courses"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ courses: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

// [POST] Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, totalIntake, description, coordinator, link } = body;

    // Only check the required fields
if ([title, department, description, coordinator].some(f => !f) || totalIntake === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    
    const docRef = await addDoc(collection(db, "courses"), {
      title,
      department,
      totalIntake,
      description,
      coordinator,
      link: link || "",
      createdAt: serverTimestamp(),
    });
    console.log("Incoming body:", body);

    return NextResponse.json({ message: "Course created", id: docRef.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
