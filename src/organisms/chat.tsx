import { GoogleGenAI } from "@google/genai";
import { useUploadedFile } from "@/context/file-provider";
import { ChatInput, ChatMessage } from "../molecules";
import { Bot, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  generateCoversation,
  generateInterviewQuestions,
  generateStudyGuide,
  generateSumary,
} from "@/utils";
import { STATUS } from "@/enums";
import { CustomLoader } from "@/molecules";
import { useAPI } from "@/context/api-provider";

export const ChatWindow = () => {
  const { api } = useAPI();
  const { file } = useUploadedFile();
  const [summary, setSummary] = useState<string>(
    "Summary : This document is an introduction to Tailwind CSS, a utility-first CSS framework designed to streamline web styling and promote design consistency. It contrasts Tailwind with traditional CSS, highlighting its utility-based approach that enables styling through the application of pre-defined low-level classes, bypassing the need for writing custom CSS in many cases. The document focuses on explaining core concepts such as: * **Core Principles:** A discussion around its utility-first paradigm, responsive design using breakpoints, and dynamic states controlled via pseudo-selectors. * **Class Essentials:** Guides through the class essentials, offering a structured way to remember and organize utility classes by categories, like layout, typography, background & color, flexbox & grid, spacing, and borders. It also touches on the naming conventions, abbreviations, and modifiers used in Tailwind classes. * **Advanced Features:** Extends into dark mode implementation, leveraging the `prefers-color-scheme` media feature, and delving into functions and directives like `@tailwind`, `@layer`, `@apply`, and `@config` for advanced CSS customization and config control. * **Customization:** Customization and extendibility through its configuration file, including themes and plugins. * **Accessibility:** It emphasizes accessibility features, particularly the `sr-only` and `not-sr-only` classes for screen reader support. * **Interactivity:** Animations, transitions, and cursor management for a more dynamic and engaging user experience. * **Advanced Techniques**: Advanced tricks and special utilities that can be used to make development more efficient, such as `accent`, `fluid texts`, using less JavaScript and the `file` prefix. * **Component Libraries:** Finally, a list of component libraries available to use with Tailwind CSS is provided. In summary, this starter kit acts as a comprehensive guide to using Tailwind CSS effectively, offering a blend of introductory concepts and advanced techniques to empower developers in building efficient, responsive, accessible, and customizable web interfaces. It also highlights the resourcefulness of JS Mastery for further development."
  );
  const [studyGuide, setStudyGuide] = useState<string>("");
  const [interviewQuestions, setInterviewQuestions] = useState<string>("");
  const [status, setStatus] = useState<string>(STATUS.IDLE);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );

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
                    <p className="text-black text-sm leading-relaxed text-left">
                      {summary}
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
                    <p className="text-black text-sm leading-relaxed text-left">
                      {studyGuide}
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
