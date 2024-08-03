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

export function Filters({
  label,
  data,
  placeholder,
  value,
  setValue,
}: FiltersProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {value ? <>{value}</> : <>{placeholder}</>}
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
                      const v =
                        data.find((status) => status.value === value)?.value ||
                        "";
                      setValue(v);
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
      </Popover>
    </div>
  );
}
type FiltersProps = {
  placeholder: string;
  label: string;
  data: Array<IOption>;
  value: string;
  setValue: (a: string) => void;
};
