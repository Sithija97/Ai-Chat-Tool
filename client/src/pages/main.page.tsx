import { MainTemplate } from "@/templates";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";

export const MainPage = () => {
  // return <MainTemplate />;
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

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      console.log("File dropped:", files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log("File selected:", files[0].name);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="h-screen w-full flex items-center">
      <div className="h-full w-[60%] px-32 py-16 ">
        {/* Left Side - Upload Section */}
        <div className="space-y-6 3xl:py-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Upload your document
            </h2>
            <p className="text-gray-600 text-sm">
              Supported file type: docx, pdf, pptx
            </p>
          </div>

          {/* Upload Area */}
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
            <div className="space-y-4 px-24 py-28">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>

              <div className="space-y-2">
                <p className="text-gray-600 font-medium">Drag your file here</p>
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
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.pdf,.pptx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="h-full w-[40%] bg-slate-100 2xl:p-10 3xl:p-12 overflow-y-auto ">
        <MainTemplate />
      </div>
    </div>
  );
};
