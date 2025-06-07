// schema/ProjectSchema.ts
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function ProjectSchema({
  title,
  description,
  tags,
  githubLink,
  liveLink,
  createdBy,
}: {
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
  liveLink?: string;
  createdBy: string;
}) {
  if (!title.trim()) throw new Error("Title is required.");
  if (!description.trim()) throw new Error("Description is required.");
  if (!Array.isArray(tags) || tags.length === 0) throw new Error("Tags must be a non-empty array.");
  if (!createdBy.trim()) throw new Error("Creator ID is required.");
  if (githubLink && !isValidURL(githubLink)) throw new Error("Invalid GitHub link.");
  if (liveLink && !isValidURL(liveLink)) throw new Error("Invalid live site link.");

  const docRef = await addDoc(collection(db, "projects"), {
    title,
    description,
    tags,
    githubLink: githubLink || "",
    liveLink: liveLink || "",
    createdBy,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
