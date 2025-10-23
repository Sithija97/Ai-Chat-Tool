import { GoogleGenAI } from "@google/genai";
import { useUploadedFile } from "@/context/file-provider";
import { ChatInput, ChatMessage } from "../molecules";
import { Bot, Sparkles } from "lucide-react";
import { useEffect } from "react";
import {
  generateCoversation,
  generateInterviewQuestions,
  generateStudyGuide,
  generateSumary,
} from "@/utils";
import { STATUS } from "@/enums";
import { CustomLoader } from "@/molecules";
import { useAPI } from "@/context/api-provider";
import parse from "html-react-parser";
import type { IMainProps } from "@/templates";

export const ChatWindow = ({
  summary,
  setSummary,
  studyGuide,
  setStudyGuide,
  interviewQuestions,
  setInterviewQuestions,
  status,
  setStatus,
  input,
  setInput,
  messages,
  setMessages,
}: IMainProps) => {
  const { api } = useAPI();
  const { file } = useUploadedFile();

  const ai = api && new GoogleGenAI({ apiKey: api });

  const handleSendMessage = () => {
    if (input.length && file && ai) {
      const newUserMessage = { role: "user", text: input };
      const updatedMessages = [...messages, newUserMessage];

      setInput("");
      setMessages(updatedMessages);
      generateCoversation({
        ai,
        file,
        input,
        messages: updatedMessages,
        setMessages,
        setStatus,
      });
    }
  };

  useEffect(() => {
    if (status === STATUS.IDLE && file && ai) {
      generateSumary({ ai, file, setStatus, setSummary });
    }
  }, [file]);

  const handleGenerateStudyGuide = () => {
    if (status === STATUS.IDLE && file && ai)
      generateStudyGuide({ ai, file, setStatus, setStudyGuide });
  };

  const handleGenerateInterviewQuestions = () => {
    if (status === STATUS.IDLE && file && ai) {
      generateInterviewQuestions({
        ai,
        file,
        setStatus,
        setInterviewQuestions,
      });
    }
  };

  return (
    <div className="relative h-full overflow-hidden">
      {/* Full screen height */}
      <div className="flex flex-col h-full relative">
        {/* Scrollable chat messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-32 space-y-6">
            {/* Bot message */}

            {summary && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-200 rounded-md flex items-center justify-center">
                    <Bot
                      className="w-4 h-4 text-violet-800"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="bg-white rounded-sm p-2">
                    <p className="text-black text-sm leading-relaxed text-left flex items-center gap-1">
                      <Sparkles
                        className="w-4 h-4 text-amber-300"
                        strokeWidth={2.5}
                        fill="currentColor"
                      />
                      <strong>Summary :</strong>
                    </p>
                    <p className="text-black text-sm leading-relaxed text-left prose">
                      {parse(summary)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {studyGuide && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-200 rounded-md flex items-center justify-center">
                    <Bot
                      className="w-4 h-4 text-violet-800"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="bg-white rounded-sm p-2">
                    <p className="text-black text-sm leading-relaxed text-left flex items-center gap-1">
                      <Sparkles
                        className="w-4 h-4 text-amber-300"
                        strokeWidth={2.5}
                        fill="currentColor"
                      />
                      <strong>Study Guide :</strong>
                    </p>
                    <p className="text-black text-sm leading-relaxed text-left prose">
                      {parse(studyGuide)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} text={msg.text} />
            ))}

            {status === STATUS.LOADING && <CustomLoader status={status} />}
          </div>
        </div>

        {/* Input area pinned to bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleGenerateStudyGuide={handleGenerateStudyGuide}
          />
        </div>
      </div>
    </div>
  );
};
