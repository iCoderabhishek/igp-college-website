import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// DELETE faculty
export async function DELETE(_: Request, context: any) {
  const { id } = context.params;

  try {
    await deleteDoc(doc(db, "faculties", id));
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete faculty" },
      { status: 500 }
    );
  }
}

// PUT (update faculty)
// export async function PUT(req: Request, context: { params: { id: string } }) {
export async function PUT(req: Request, context: any) {
  const { id } = context.params;
  const body = await req.json();

  try {
    await updateDoc(doc(db, "faculties", id), {
      ...body,
      updatedAt: new Date().toISOString(), // Save ISO string for Firestore compatibility
    });
    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update faculty" },
      { status: 500 }
    );
  }
}
