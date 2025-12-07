import { Button, Input } from "@/atoms";
import { useUploadedFile } from "@/context/file-provider";
import { generateFile } from "@/utils";
import { FileQuestion, MapPlus } from "lucide-react";
import { useRef } from "react";

type IProps = {
  custoInputStyle?: string;
  onClose: () => void;
  handleGenerateStudyGuide: () => void;
};

export type FileType = {
  name: string;
  type: string;
  file: string; // base64 encoded string
  imageUrl: string; // URL for the file object
};

export const FileUpload = ({
  custoInputStyle,
  onClose,
  handleGenerateStudyGuide,
}: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setUploadedFile } = useUploadedFile();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj = event.target.files?.[0];
    if (!fileObj) {
      console.error("No file selected.");
      return;
    }

    const file = await generateFile(fileObj);
    setUploadedFile(file);
    console.log(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
    onClose();
  };

  return (
    <section className="file-upload">
      <div className="flex flex-col items-stretch sm:items-start gap-2 w-full">
        <Input
          ref={inputRef}
          id="picture"
          type="file"
          name="file-uploader"
          accept=".pdf, .jpg, jpeg, .png"
          onChange={handleFileUpload}
          className={custoInputStyle}
        />

        {/* <Button variant="ghost" size="sm" onClick={handleButtonClick}>
          <PaperclipIcon />
          Add photos and files
        </Button> */}
        <Button variant="ghost" size="sm" onClick={handleGenerateStudyGuide} className="w-full sm:w-auto justify-start text-xs sm:text-sm">
          <MapPlus className="w-3 h-3 sm:w-4 sm:h-4" />
          Study Guide
        </Button>
        <Button variant="ghost" size="sm" onClick={() => {}} disabled className="w-full sm:w-auto justify-start text-xs sm:text-sm">
          <FileQuestion className="w-3 h-3 sm:w-4 sm:h-4" />
          Practice Questions
        </Button>
      </div>
    </section>
  );
};
