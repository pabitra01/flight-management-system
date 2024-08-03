"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IOption } from "@/interface/flights";
import { Checkbox } from "../ui/checkbox";

export function EditPopoverContent({
  data,
  handleSaveStatus,
  status,
  setStatus,
}: EditPopoverContentProps) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleUpdateStatus = () => {
    if (isChecked) {
      handleSaveStatus();
      setOpen(false);
    }
  };
  return (
    <div className="w-full py-3">
      <Popover open={open} onOpenChange={setOpen}>
        <h4 className="font-medium leading-none mb-5">Select Status</h4>

        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start">
            {status ? <>{status}</> : <>set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {data.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      const s =
                        data.find((status) => status.value === value)?.value ||
                        "";
                      setStatus(s);
                      setOpen(false);
                    }}
                  >
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        <div className="flex items-center space-x-2 mt-10">
          <Checkbox
            id="terms"
            checked={isChecked}
            defaultChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Are you sure ?{" "}
          </label>
        </div>
        <div className="flex justify-end gap-5 mt-5">
          <Button onClick={handleUpdateStatus}>Save</Button>
        </div>
      </Popover>
    </div>
  );
}
type EditPopoverContentProps = {
  data: Array<IOption>;
  handleSaveStatus: () => void;
  status: string;
  setStatus: (a: string) => void;
};
