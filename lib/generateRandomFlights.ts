import Flight from "@/models/flights";




const popularAirlines = [
  { value: 'american_airlines', label: 'American Airlines' },
  { value: 'delta_air_lines', label: 'Delta Air Lines' },
  { value: 'united_airlines', label: 'United Airlines' },
  { value: 'southwest_airlines', label: 'Southwest Airlines' },
  { value: 'lufthansa', label: 'Lufthansa' },
  { value: 'emirates', label: 'Emirates' },
  { value: 'british_airways', label: 'British Airways' },
  { value: 'air_france', label: 'Air France' },
  { value: 'qatar_airways', label: 'Qatar Airways' },
  { value: 'singapore_airlines', label: 'Singapore Airlines' },
];

const flightTypes = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
  { value: 'cargo', label: 'Cargo' },
  { value: 'private', label: 'Private' },
  { value: 'commercial', label: 'Commercial' },
];

const statuses = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_flight', label: 'In-flight' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'en_route', label: 'En Route' },
];

export function generateRandomFlights(count: number) {
  const flights = [];

  for (let i = 0; i < count; i++) {
    const flight = new Flight({
        flightNumber: `FL${Math.floor(Math.random() * 1000)}`,
        origin: `Origin ${Math.floor(Math.random() * 100)}`,
        destination: `Destination ${Math.floor(Math.random() * 100)}`,
        scheduledDeparture: new Date(new Date().getTime() + Math.random() * 1e10).toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)].value,
        flightType: flightTypes[Math.floor(Math.random() * flightTypes.length)].value,
        airline: popularAirlines[Math.floor(Math.random() * popularAirlines.length)].value,
    });
    flights.push(flight);
  }

  return flights;
}
