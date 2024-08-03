interface IOption{
value:string;
label:string
} interface IFlight {
    _id?:string;
    flightNumber: string;
    origin: string;
    destination: string;
    scheduledDeparture?: Date;
    status: string;
    airline: string;
    flightType: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
export type {IOption,IFlight}