import { Settings, MoreHorizontal, ArrowUp } from "lucide-react";
import { Textarea } from "@/atoms/textarea";
import { Button } from "@/atoms";
import { AddSection } from "@/molecules";
import type React from "react";
import { useUploadedFile } from "@/context";

type IProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleGenerateStudyGuide: () => void;
};

export const ChatInput = ({
  input,
  setInput,
  handleSendMessage,
  handleGenerateStudyGuide,
}: IProps) => {
  const { file } = useUploadedFile();
  return (
    <div>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between mr-1 sm:mr-2 mb-1 px-1 sm:px-2">
        <div className="flex items-center gap-2">
          {/* <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 bg-white hover:text-white hover:bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center gap-1"
                disabled
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs">Tools</span>
              </Button> */}
        </div>

        {/* Send Button - appears when there's text */}
        {input.trim() && (
          <Button
            size="sm"
            disabled={!file}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
            onClick={handleSendMessage}
          >
            <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-end justify-center">
        <div className="w-full max-w-3xl px-1 sm:px-2">
          {/* Input Container */}
          <div className="relative rounded-lg">
            {/* Textarea */}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="w-full bg-white border-0 resize-none text-gray-700 placeholder-gray-400 text-sm sm:text-base leading-relaxed p-2.5 sm:p-3 md:p-4 pr-12 sm:pr-14 md:pr-16 min-h-[30px] max-h-[150px] sm:max-h-[200px] focus:outline-none focus:ring-0 focus:border-transparent"
              rows={1}
            />

            {/* Right Side Buttons */}
            <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center gap-1 sm:gap-2">
              {/* <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
              >
                <Mic className="h-4 w-4" />
              </Button> */}
              {/* <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button> */}
              <AddSection handleGenerateStudyGuide={handleGenerateStudyGuide} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
