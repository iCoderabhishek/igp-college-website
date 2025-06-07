// app/api/contact-messages/route.ts

// Add at least one import...
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Your API route logic here
  const data = await request.json();
  console.log('Received data:', data);
  return NextResponse.json({ message: 'Contact message received!' });
}

// ...or an export if you don't need any imports yet
// export {};