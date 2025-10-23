/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/atoms";
import { useUploadedFile } from "@/context/file-provider";
import { MainTemplate } from "@/templates";
import { generateFile } from "@/utils";
import { CheckCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";

export const MainPage = () => {
  // return <MainTemplate />;
  const { file, setUploadedFile } = useUploadedFile();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileObj = event.target.files?.[0];
    if (!fileObj) {
      return;
    }

    const file = await generateFile(fileObj);
    setUploadedFile(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT SIDE */}
      <div className="h-full w-full lg:w-[60%] px-32 py-16 overflow-hidden">
        <div className="space-y-6 3xl:py-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Upload your document
            </h2>
            <p className="text-gray-600 text-sm">
              Supported file types: jpeg, pdf, png, mp3. mp4...etc
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-xl px-12 py-12 text-center transition-colors 3xl:py-28 ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4 px-24 py-24 h-90">
              {file ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-md">
                      File uploaded successfully!
                    </h3>
                    <p className="text-gray-600">{file?.name}</p>
                  </div>
                  <div className="flex space-x-3 justify-center">
                    <Button variant="outline" onClick={openFileDialog}>
                      Upload Different File
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">
                      Drag your file here
                    </p>
                    <p className="text-gray-500 text-sm">
                      or{" "}
                      <button
                        onClick={openFileDialog}
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                      >
                        browse
                      </button>
                    </p>
                  </div>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.pdf,.pptx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (scrollable section) */}
      <div className="h-full w-full lg:w-[40%] bg-slate-100 p-2 overflow-y-auto">
        <MainTemplate />
      </div>
    </div>
  );
};
