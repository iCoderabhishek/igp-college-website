import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'contacts'));
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
    }));

    return NextResponse.json({ success: true, data: contacts });
  } catch (err) {
    console.error('[GET /api/contact]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (message.trim().split(/\s+/).length > 149) {
      return NextResponse.json({ error: 'Message exceeds 149 words.' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'contacts'), {
      name,
      email,
      subject,
      message,
      status: 'unread',
      important: false,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, id: docRef.id, data: { ...data, status: 'unread', important: false } }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/contact]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}