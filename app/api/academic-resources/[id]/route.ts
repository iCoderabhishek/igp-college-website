import { db } from "@/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// [GET] Fetch academic resources by department ID
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params; // department id
    const { searchParams } = new URL(req.url);
    const session = searchParams.get("session");
    const semester = searchParams.get("semester");

    if (!session || !semester) {
      return NextResponse.json(
        { error: "Missing session or semester query parameters" },
        { status: 400 }
      );
    }

    // Use simpler query to avoid complex indexing requirements
    const colRef = collection(db, "academic-resources");
    
    // First get all documents for this department
    const departmentQuery = query(colRef, where("departmentId", "==", id));
    const querySnapshot = await getDocs(departmentQuery);
    
    // Filter in memory to avoid complex Firestore indexes
    const allResources = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const resources = allResources.filter((r: any) => 
      r.session === session && r.semester === semester
    );

    // Categorize by type
    const syllabus = resources.filter((r: any) => r.type === "syllabus");
    const pyqs = resources.filter((r: any) => r.type === "pyq");
    const additional = resources.filter((r: any) => r.type === "additional");
    const tests = resources.filter((r: any) => r.type === "tests");

    return NextResponse.json({ syllabus, pyqs, additional, tests });
  } catch (error) {
    console.error("GET academic-resources error:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

// [PUT] Update a specific resource
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
    }

    // Check if document exists
    const docRef = doc(db, "academic-resources", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    // Update the document
    const updateData = {
      ...body,
      updatedAt: serverTimestamp(),
    };

    // Remove id from update data if present
    delete updateData.id;

    await updateDoc(docRef, updateData);

    return NextResponse.json({ 
      message: "Resource updated",
      resource: { id, ...updateData }
    });
  } catch (error) {
    console.error("PUT academic-resources error:", error);
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

// [DELETE] Delete a specific resource
export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
    }

    // Check if document exists
    const docRef = doc(db, "academic-resources", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ message: "Resource deleted" });
  } catch (error) {
    console.error("DELETE academic-resources error:", error);
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}

// [POST] Create a new resource for a specific department
export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id: departmentId } = params;
    const url = new URL(request.url);
    const session = url.searchParams.get("session");
    const semester = url.searchParams.get("semester");
    
    const body = await request.json();
    const { title, type, url: resourceUrl, pdfLink, year, uploadedBy = "admin" } = body;

    if (!title || !type || !session || !semester) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const finalUrl = pdfLink || resourceUrl;
    if (!finalUrl) {
      return NextResponse.json({ error: "Either url or pdfLink is required" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "academic-resources"), {
      title,
      session,
      semester,
      type,
      url: finalUrl,
      pdfLink: finalUrl,
      uploadedBy,
      departmentId,
      ...(year && { year }),
      createdAt: serverTimestamp(),
    });

    // Fetch updated resources for this department/session/semester using simple query
    const colRef = collection(db, "academic-resources");
    const departmentQuery = query(colRef, where("departmentId", "==", departmentId));
    const querySnapshot = await getDocs(departmentQuery);
    
    const allResources = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const resources = allResources.filter((r: any) => 
      r.session === session && r.semester === semester
    );

    // Categorize by type
    const syllabus = resources.filter((r: any) => r.type === "syllabus");
    const pyqs = resources.filter((r: any) => r.type === "pyq");
    const additional = resources.filter((r: any) => r.type === "additional");
    const tests = resources.filter((r: any) => r.type === "tests");

    return NextResponse.json({ 
      message: "Resource created", 
      id: docRef.id,
      syllabus, 
      pyqs, 
      additional, 
      tests 
    }, { status: 201 });
  } catch (error) {
    console.error("POST academic-resources error:", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}