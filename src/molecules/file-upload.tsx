import { Button, Input } from "@/atoms";
import { useUploadedFile } from "@/context/file-provider";
import { generateFile } from "@/utils";

import { PaperclipIcon } from "lucide-react";
import { useRef } from "react";

type IProps = {
  custoInputStyle?: string;
  onClose: () => void;
};

export type FileType = {
  name: string;
  type: string;
  file: string; // base64 encoded string
  imageUrl: string; // URL for the file object
};

export const FileUpload = ({ custoInputStyle, onClose }: IProps) => {
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
      <div className="grid items-center gap-3">
        <Input
          ref={inputRef}
          id="picture"
          type="file"
          name="file-uploader"
          accept=".pdf, .jpg, jpeg, .png"
          onChange={handleFileUpload}
          className={custoInputStyle}
        />

        <Button variant="ghost" size="sm" onClick={handleButtonClick}>
          <PaperclipIcon />
          Add photos and files
        </Button>
      </div>
    </section>
  );
};
