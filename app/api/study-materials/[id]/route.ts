
// app/api/study-materials/[id]/route.ts
export const dynamic = "force-dynamic";

import { db } from "@/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// [PUT] Update study material by ID
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json();
    const ref = doc(db, "study-materials", params.id);
    await updateDoc(ref, updates);
    return NextResponse.json({ message: "Study material updated" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update study material" }, { status: 500 });
  }
}

// [DELETE] Delete study material by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ref = doc(db, "study-materials", params.id);
    await deleteDoc(ref);
    return NextResponse.json({ message: "Study material deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete study material" }, { status: 500 });
  }
}
