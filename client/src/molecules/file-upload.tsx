import { Button, Input } from "@/atoms";
import { Buffer } from "buffer";
import { PaperclipIcon } from "lucide-react";
import { useRef } from "react";

type IProps = {
  setFile: React.Dispatch<React.SetStateAction<FileType | null>>;
  custoInputStyle?: string;
};

export type FileType = {
  type: string;
  file: string; // base64 encoded string
  imageUrl: string; // URL for the file object
};

export const FileUpload = ({ custoInputStyle, setFile }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj = event.target.files?.[0];
    if (!fileObj) {
      console.error("No file selected.");
      return;
    }
    const fileUpload = await fileObj.arrayBuffer();

    const file = {
      type: fileObj.type,
      file: Buffer.from(fileUpload).toString("base64"),
      imageUrl: fileObj.type.includes("pdf")
        ? "/pdf-icon.png"
        : URL.createObjectURL(fileObj),
    };
    setFile(file);
    console.log(file);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
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
