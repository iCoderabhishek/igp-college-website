import { db } from "@/firebase";
import { AcademicResource } from "@/types/department";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// [GET] Fetch academic resources with filtering
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const session = url.searchParams.get("session");
    const semester = url.searchParams.get("semester");
    const departmentId = url.searchParams.get("department");
    const type = url.searchParams.get("type");

    const collectionRef = collection(db, "academic-resources");
    
    // Use simpler queries to avoid complex indexing
    let querySnapshot;
    
    if (departmentId) {
      // Start with department filter only
      const departmentQuery = query(collectionRef, where("departmentId", "==", departmentId));
      querySnapshot = await getDocs(departmentQuery);
      
      // Filter in memory to avoid complex Firestore indexes
      const allDocs: AcademicResource[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<AcademicResource, "id">),
      }));
      
      let filtered = allDocs;
      
      if (session) {
        filtered = filtered.filter(item => item.session === session);
      }
      if (semester) {
        filtered = filtered.filter(item => item.semester === semester);
      }
      if (type) {
        filtered = filtered.filter(item => item.type === type);
      }
      
      // Sort by createdAt if available
      filtered.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });
      
      return NextResponse.json({ resources: filtered });
    } else {
      // No department filter, get all documents
      querySnapshot = await getDocs(collectionRef);
      const allDocs: AcademicResource[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<AcademicResource, "id">),
      }));
      
      let filtered = allDocs;
      
      if (session) {
        filtered = filtered.filter(item => item.session === session);
      }
      if (semester) {
        filtered = filtered.filter(item => item.semester === semester);
      }
      if (type) {
        filtered = filtered.filter(item => item.type === type);
      }
      
      // Sort by createdAt if available
      filtered.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });
      
      return NextResponse.json({ resources: filtered });
    }
  } catch (error) {
    console.error("GET academic-resources error:", error);
    return NextResponse.json({ error: "Failed to fetch academic resources" }, { status: 500 });
  }
}

// [POST] Create a new academic resource
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, session, semester, type, url, pdfLink, uploadedBy, departmentId, year } = body;

    if (!title || !session || !semester || !type || !uploadedBy || !departmentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use pdfLink if provided, otherwise use url
    const resourceUrl = pdfLink || url;
    if (!resourceUrl) {
      return NextResponse.json({ error: "Either url or pdfLink is required" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "academic-resources"), {
      title,
      session,
      semester,
      type,
      url: resourceUrl,
      pdfLink: resourceUrl, // For backward compatibility
      uploadedBy,
      departmentId,
      ...(year && { year }), // Only add year if provided
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ 
      message: "Resource created", 
      id: docRef.id,
      resource: {
        id: docRef.id,
        title,
        session,
        semester,
        type,
        url: resourceUrl,
        pdfLink: resourceUrl,
        uploadedBy,
        departmentId,
        ...(year && { year }),
      }
    }, { status: 201 });
  } catch (error) {
    console.error("POST academic-resources error:", error);
    return NextResponse.json({ error: "Failed to create academic resource" }, { status: 500 });
  }
}

// [PATCH] Update multiple resources (for batch operations)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { session, semester, type, data, departmentId } = body;

    if (!session || !semester || !type || !data || !departmentId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // This is a simplified batch update - in a real app, you might want to implement
    // proper batch operations using Firestore batch writes
    return NextResponse.json({ message: "Batch update not implemented" }, { status: 501 });
  } catch (error) {
    console.error("PATCH academic-resources error:", error);
    return NextResponse.json({ error: "Failed to update resources" }, { status: 500 });
  }
}