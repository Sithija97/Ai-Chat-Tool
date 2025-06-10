import { Buffer } from "buffer";

type IProps = {
  setFile: React.Dispatch<React.SetStateAction<FileType | null>>;
};

export type FileType = {
  type: string;
  file: string; // base64 encoded string
  imageUrl: string; // URL for the file object
};

export const FileUpload = ({ setFile }: IProps) => {
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

  return (
    <section>
      <h2>Get Started</h2>
      <input
        type="file"
        name="file-uploader"
        id="file-uploader"
        multiple
        accept=".pdf, .jpg, jpeg, .png"
        onChange={handleFileUpload}
      />
    </section>
  );
};
