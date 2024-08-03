import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil } from "lucide-react";
import { EditPopoverContent } from "./EditPopoverContent";
import { statuses } from "../data/flights";
import { useState } from "react";
import { handleStatusChange } from "@/lib/api";
import { toast } from "sonner";

export function EditPopover({ id, status }: EditPopoverProps) {
  const [status_, setStatus] = useState(status);

  const showToast = (toastId: string | number) => {
    toast.success("Status updated", {
      id: toastId,
    });
    window.location.reload();
  };
  const handleSaveStatus = () => {
    const toastId = toast.loading("Updating status ...");
    if (id) {
      handleStatusChange(id, status_, () => showToast(toastId));
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8 justify-center items-center flex"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="left">
        <EditPopoverContent
          data={statuses}
          handleSaveStatus={handleSaveStatus}
          status={status_}
          setStatus={setStatus}
        />
      </PopoverContent>
    </Popover>
  );
}
type EditPopoverProps = {
  id?: string;
  status: string;
};
