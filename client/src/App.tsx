import { FileUpload, Header, Summary, type FileType } from "@/molecules";
import { useState } from "react";

const App = () => {
  const [uploadFile, setUploadedFile] = useState<FileType | null>(null);

  return (
    <>
      <main className="container">
        <Header />
        {uploadFile ? (
          <Summary file={uploadFile} />
        ) : (
          <FileUpload setFile={setUploadedFile} />
        )}
      </main>
    </>
  );
};

export default App;
