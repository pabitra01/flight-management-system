import { IFlight } from "@/interface/flights";
import { auth } from "./auth";

export async function insertRandomFlights(count:number) {
    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        body: JSON.stringify({ count }),

      });
  
      if (!response.ok) {
        throw new Error('Failed to insert flights');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error inserting flights');
    }
  }
  
  export async function getAllFlights() {
    try {
      const response = await fetch('/api/flights', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to insert flights');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
   
      throw new Error('Error inserting flights');
    }
  }
  export const getAllFlightsByQuery = async (data:IFlight) => {
    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const flights = await response.json();
    return flights
    } catch (error) {
   
    }
  };
  export const getAllOrigins = async () => {
    try {
      const response = await fetch('/api/flights/origins');
      if (!response.ok) {
        throw new Error('Failed to fetch origins');
      }
      const data = await response.json();
return data    } catch (error) {
   
    }
  };
  export const getAllDestinations = async () => {
    try {
      const response = await fetch('/api/flights/destinations');
      if (!response.ok) {
        throw new Error('Failed to fetch origins');
      }
      const data = await response.json();
return data    } catch (error) {
   
    }
  };
 export const handleStatusChange = async (id:string,status:string,cb?:()=>void) => {
    try {
      const response = await fetch(`/api/flights/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update flight status');
      }

      const updatedFlight = await response.json();
      if(updatedFlight && cb){
        cb()
      }
    } catch (error) {
   
    }
  };
 