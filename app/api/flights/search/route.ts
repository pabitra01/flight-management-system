import { connectToDatabase } from '@/lib/mongodb';
import Flight from '@/models/flights';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    try {
      await connectToDatabase();
      
      const body = await req.json();
      const { flightNumber, origin, destination, airline, flightType, status } = body;
  
      const query: any = {};
  
      if (flightNumber) query.flightNumber = flightNumber;
      if (origin) query.origin = origin;
      if (destination) query.destination = destination;
      if (airline) query.airline = airline;
      if (flightType) query.flightType = flightType;
      if (status) query.status = status;
  
      const flights = await Flight.find(query).exec();
      return NextResponse.json(flights);
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
