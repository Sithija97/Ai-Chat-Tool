import { Button, Popover, PopoverContent, PopoverTrigger } from "@/atoms";
import { PlusIcon } from "lucide-react";
import { FileUpload } from "./file-upload";
import { useState } from "react";

export const AddSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closePopover = () => setIsOpen(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="size-8 bg-white text-gray-400"
        >
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <FileUpload custoInputStyle="hidden" onClose={closePopover} />
      </PopoverContent>
    </Popover>
  );
};
