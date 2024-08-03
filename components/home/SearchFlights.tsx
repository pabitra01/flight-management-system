"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "./Select";
import { Filters } from "./Filter";
import { useState } from "react";
import { getAllFlightsByQuery } from "@/lib/api";
import { IFlight } from "@/interface/flights";
import { airlines, flightTypes, statuses } from "../data/flights";

const SearchFlights = ({
  setData,
  origins,
  destinations,
}: SearchFlightsProps) => {
  const initialBodyState = {
    flightNumber: "",
    origin: "",
    destination: "",
    airline: "",
    flightType: "",
    status: "",
  };
  const [body, setBody] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    airline: "",
    flightType: "",
    status: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setBody({
      ...body,
      [name]: value,
    });
  };
  const handleSearch = async () => {
    const data = await getAllFlightsByQuery(body);
    setData(data);
  };
  const handleReset = () => {
    setBody(initialBodyState);
  };
  return (
    <Card className="w-full mt-10 mb-5">
      <CardHeader>
        <CardTitle>Create project </CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Flight No.</Label>
            <Input
              id="name"
              placeholder="Type here ..."
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="flightNumber"
              value={body.flightNumber}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Origin</Label>
            <div className="w-full">
              <Select
                data={origins}
                label="Origin"
                placeholder="Select Origin"
                value={body.origin}
                setValue={(a) => handleInputChange("origin", a)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label>Destination</Label>
            <div className="w-full">
              <Select
                data={destinations}
                label="Destination"
                placeholder="Select destination"
                value={body.destination}
                setValue={(a) => handleInputChange("destination", a)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-10">
          <div className="flex flex-col space-y-1.5">
            <Filters
              label="Status"
              data={statuses}
              placeholder="+ Set Status"
              value={body.status}
              setValue={(a) => handleInputChange("status", a)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Filters
              label="Airline"
              data={airlines}
              placeholder="+ Set Airline"
              value={body.airline}
              setValue={(a) => handleInputChange("airline", a)}
            />
          </div>{" "}
          <div className="flex flex-col space-y-1.5">
            <Filters
              label="Flight Type"
              data={flightTypes}
              placeholder="+ Set Flight Type"
              value={body.flightType}
              setValue={(a) => handleInputChange("flightType", a)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-5">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSearch}>Search</Button>
      </CardFooter>
    </Card>
  );
};
type SearchFlightsProps = {
  setData: (a: Array<IFlight>) => void;
  origins?: Array<any>;
  destinations?: Array<any>;
};
export default SearchFlights;
