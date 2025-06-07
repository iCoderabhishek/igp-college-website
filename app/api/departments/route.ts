export const dynamic = "force-dynamic";

import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Collection ref
const departmentsCol = collection(db, "departments");

// [GET] Fetch all departments
export async function GET() {
  try {
    const snapshot = await getDocs(departmentsCol);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ departments: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

// [POST] Add a new department
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      shortName,
      hod,
      image,
      description,
      faculty,
      labs,
    } = body;

    if (!name || !shortName || !hod) {
      return NextResponse.json(
        { error: "Missing required fields: name, shortName, or hod" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(departmentsCol, {
      name,
      shortName,
      hod,
      image: image || "",
      description: description || "",
      faculty: faculty || [],
      labs: labs || [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: "Department added", id: docRef.id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add department" },
      { status: 500 }
    );
  }
}
