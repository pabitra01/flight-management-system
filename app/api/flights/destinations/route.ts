import { connectToDatabase } from '@/lib/mongodb';
import Flight from '@/models/flights';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const origins = await Flight.distinct('destination');
    return NextResponse.json(origins);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
