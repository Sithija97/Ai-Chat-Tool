import { Button, Popover, PopoverContent, PopoverTrigger } from "@/atoms";
import { PlusIcon } from "lucide-react";
import { FileUpload } from "./file-upload";
import { useState } from "react";

type IProps = {
  handleGenerateStudyGuide: () => void;
};

export const AddSection = ({ handleGenerateStudyGuide }: IProps) => {
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
      <PopoverContent className="w-48 sm:w-56 p-2">
        <FileUpload
          custoInputStyle="hidden"
          onClose={closePopover}
          handleGenerateStudyGuide={handleGenerateStudyGuide}
        />
      </PopoverContent>
    </Popover>
  );
};
