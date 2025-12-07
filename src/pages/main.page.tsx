/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/atoms";
import { useUploadedFile } from "@/context/file-provider";
import { STATUS } from "@/enums";
import { MainTemplate } from "@/templates";
import { generateFile } from "@/utils";
import { CheckCircle, CirclePlus, Upload } from "lucide-react";
import { useRef, useState } from "react";

export const MainPage = () => {
  const { file, setUploadedFile } = useUploadedFile();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [summary, setSummary] = useState<string>("");
  const [studyGuide, setStudyGuide] = useState<string>("");
  const [interviewQuestions, setInterviewQuestions] = useState<string>("");
  const [status, setStatus] = useState<string>(STATUS.IDLE);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );

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

  const newChat = () => {
    setSummary("");
    setStudyGuide("");
    setInterviewQuestions("");
    setStatus(STATUS.IDLE);
    setInput("");
    setMessages([]);
    setUploadedFile(null);
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT SIDE */}
      <div className="h-full w-full lg:w-[60%] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 overflow-y-auto lg:overflow-hidden">
        <div className="space-y-4 sm:space-y-5 md:space-y-6 3xl:py-8">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
              Upload your document
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">
              Supported file types: jpeg, pdf, png, mp3. mp4...etc
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg sm:rounded-xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-12 xl:px-12 xl:py-12 text-center transition-colors 3xl:py-28 ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-3 sm:space-y-4 px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:px-24 2xl:py-24 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex flex-col justify-center">
              {file ? (
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base md:text-md">
                      File uploaded successfully!
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base break-words px-2">{file?.name}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch sm:items-center px-4">
                    <Button variant="outline" onClick={openFileDialog} className="w-full sm:w-auto">
                      Upload Different File
                    </Button>
                    <Button variant="outline" onClick={newChat} className="w-full sm:w-auto">
                      <CirclePlus className="w-4 h-4 sm:w-5 sm:h-5" />
                      New Chat
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-gray-600 font-medium text-sm sm:text-base">
                      Drag your file here
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
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
      <div className="h-full w-full lg:w-[40%] bg-slate-100 p-1 sm:p-2 overflow-y-auto">
        <MainTemplate
          summary={summary}
          setSummary={setSummary}
          studyGuide={studyGuide}
          setStudyGuide={setStudyGuide}
          interviewQuestions={interviewQuestions}
          setInterviewQuestions={setInterviewQuestions}
          status={status}
          setStatus={setStatus}
          input={input}
          setInput={setInput}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};
