import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    const docRef = doc(db, 'contacts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    const data = docSnap.data();
    const contact = {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
    };

    return NextResponse.json({ success: true, data: contact });
  } catch (err) {
    console.error('[GET /api/contact/[id]]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    const docRef = doc(db, 'contacts', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    await updateDoc(docRef, body);

    return NextResponse.json({ success: true, message: 'Contact updated successfully' });
  } catch (err) {
    console.error('[PATCH /api/contact/[id]]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ error: 'Contact ID is required' }, { status: 400 });
    }

    const docRef = doc(db, 'contacts', id);
    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('[DELETE /api/contact/[id]]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}