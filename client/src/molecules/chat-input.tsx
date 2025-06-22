import { Settings, MoreHorizontal, ArrowUp } from "lucide-react";
import { Textarea } from "@/atoms/textarea";
import { Button } from "@/atoms";
import { AddSection } from "@/molecules";
import type React from "react";

type IProps = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
};

export const ChatInput = ({ input, setInput, handleSendMessage }: IProps) => {
  return (
    <div>
      {/* Main Content Area */}
      <div className="flex-1 flex items-end justify-center ">
        <div className="w-full max-w-3xl px-2">
          {/* Input Container */}
          <div className="relative rounded-lg">
            {/* Textarea */}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
              className="w-full bg-white border-0 resize-none text-gray-700 placeholder-gray-400 text-base leading-relaxed p-4 pr-16 min-h-[60px] max-h-[200px] focus:outline-none focus:ring-0 focus:border-transparent"
              rows={1}
            />

            {/* Right Side Buttons */}
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              {/* <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
              >
                <Mic className="h-4 w-4" />
              </Button> */}
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-2">
              <AddSection />
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 bg-white hover:text-white hover:bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center gap-1"
                disabled
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs">Tools</span>
              </Button>
            </div>

            {/* Send Button - appears when there's text */}
            {input.trim() && (
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                onClick={handleSendMessage}
              >
                <ArrowUp />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
