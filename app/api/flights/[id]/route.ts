import { connectToDatabase } from '@/lib/mongodb';
import Flight from '@/models/flights';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectToDatabase();
    const body = await req.json();
    const { status } = body;
    const flight = await Flight.findByIdAndUpdate(id, { $set: { status } }, { new: true });
    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    return NextResponse.json(flight);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
