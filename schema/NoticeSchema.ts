// schema/NoticeSchema.ts
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function NoticeSchema({
  title,
  content,
  category,
  isImportant,
  noticeLink,
  createdBy,
}: {
  title: string;
  content: string;
  category: string;
  isImportant: boolean;
  noticeLink: string;
  createdBy: string;
}) {
  // ✅ Basic validation checks
  if (!title.trim()) throw new Error("Title is required.");
  if (!content.trim()) throw new Error("Content is required.");
  if (!category.trim()) throw new Error("Category is required.");
  if (!createdBy.trim()) throw new Error("Creator ID is required.");
  if (noticeLink && !isValidURL(noticeLink)) throw new Error("Invalid notice link.");

  const docRef = await addDoc(collection(db, "notices"), {
    title,
    content,
    category,
    isImportant,
    noticeLink,
    createdBy,
    
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// Optional: helper function to validate URL
function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
