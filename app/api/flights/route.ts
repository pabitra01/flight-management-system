import { generateRandomFlights } from '@/lib/generateRandomFlights';
import { connectToDatabase } from '@/lib/mongodb';
import Flight from '@/models/flights';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const flights = await Flight.find({}).exec();
    return NextResponse.json(flights);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
    try {
      await connectToDatabase();
      const { count } = await req.json();
      const flights = generateRandomFlights(count);
      await Flight.insertMany(flights);
      return NextResponse.json({ message: 'Successfully inserted 100 flights' });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }