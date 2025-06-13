import type { FileType } from "@/molecules";
import { ChatInput } from "./chat-input";
import { Bot, User } from "lucide-react";

type IProps = {
  setFile: React.Dispatch<React.SetStateAction<FileType | null>>;
};

export const ChatWindow = ({ setFile }: IProps) => {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Full screen height */}
      <div className="flex flex-col h-full relative">
        {/* Scrollable chat messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-32 space-y-6">
            {/* User message */}
            <div className="flex justify-end">
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="bg-white rounded-sm p-2">
                  <p className="text-black text-sm leading-relaxed text-left">
                    when was this photo taken?
                  </p>
                </div>
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-md flex items-center justify-center">
                  <User className="w-4 h-4 text-teal-800" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Bot message */}
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 bg-violet-200 rounded-md flex items-center justify-center">
                  <Bot className="w-4 h-4 text-violet-800" strokeWidth={2.5} />
                </div>
                <div className="bg-white rounded-sm p-2">
                  <p className="text-black text-sm leading-relaxed text-left">
                    This photo was taken in September 2008 at Santiago
                    Bernabeau.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input area pinned to bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <ChatInput setFile={setFile} />
        </div>
      </div>
    </div>
  );
};
