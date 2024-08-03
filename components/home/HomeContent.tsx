"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import SearchFlights from "./SearchFlights";
import Navbar from "../common/Navbar";
import { EditPopover } from "./EditPopover";
import { useEffect, useState } from "react";
import {
  getAllDestinations,
  getAllFlights,
  getAllOrigins,
  insertRandomFlights,
} from "@/lib/api";
import { IFlight } from "@/interface/flights";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const HomeContent = () => {
  const session = useSession();

  const [data, setData] = useState<Array<IFlight>>();
  const [origins, setOrigins] = useState<Array<String>>();
  const [destinations, setDestinations] = useState<Array<String>>();

  const handleInsertFlights = async (count: number) => {
    try {
      await insertRandomFlights(count);
      toast.success("Success");
    } catch (error) {
      console.log(error);
    }
  };
  const getAllFlightsAction = async () => {
    try {
      const flights = await getAllFlights();
      setData(flights);
    } catch (error) {}
  };
  const fetchOrigins = async () => {
    const origins = await getAllOrigins();
    setOrigins(origins);
  };
  const fetchDestinations = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };
  useEffect(() => {
    getAllFlightsAction();
    fetchOrigins();
    fetchDestinations();
  }, []);
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <SearchFlights
          setData={setData}
          origins={origins}
          destinations={destinations}
        />
        <div className="flex gap-5 py-5">
          <Button onClick={() => handleInsertFlights(1)}>
            Generate 1 flight
          </Button>
          <Button onClick={() => handleInsertFlights(100)}>
            Generate 100 flights
          </Button>
        </div>

        <Table className="mb-20">
          <TableCaption>A list of flights.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Flight Number</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Flight Type</TableHead>
              <TableHead>Airline</TableHead>

              <TableHead
                className={`${
                  session.status !== "authenticated" ? "text-right" : ""
                }`}
              >
                Status
              </TableHead>
              {session.status === "authenticated" && (
                <TableHead className="text-right">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((flight, i) => (
              <TableRow key={i} className="group">
                <TableCell className="font-medium">
                  {flight.flightNumber}
                </TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>
                  {moment(flight.scheduledDeparture).format(
                    "MMMM D, YYYY h:mm A"
                  )}
                </TableCell>
                <TableCell>{flight.flightType}</TableCell>
                <TableCell>{flight.airline}</TableCell>

                <TableCell
                  className={`${
                    session.status !== "authenticated"
                      ? " flex justify-end"
                      : ""
                  }`}
                >
                  <div
                    className={`px-3 py-1 border-2 border-input rounded-full w-fit text-right `}
                  >
                    {flight.status}
                  </div>
                </TableCell>
                {session.status === "authenticated" && (
                  <TableCell className="flex justify-end">
                    <EditPopover id={flight._id} status={flight.status} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
};
export default HomeContent;
