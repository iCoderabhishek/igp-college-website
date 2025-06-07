import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// DELETE
export async function DELETE(_: Request, context: any) {
  const { id } = context.params;
  await deleteDoc(doc(db, "notices", id));
  return NextResponse.json({ message: "Deleted successfully" });
}

// PUT
export async function PUT(req: Request, context: any) {
  const { id } = context.params;
  const body = await req.json();
  await updateDoc(doc(db, "notices", id), {
    ...body,
    updatedAt: new Date(),
  });
  return NextResponse.json({ message: "Updated successfully" });
}
