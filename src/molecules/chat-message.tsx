import { Bot, User } from "lucide-react";
import { ROLES } from "@/enums";

type IProps = {
  role?: string;
  status?: string;
  text?: string;
};

export const ChatMessage = ({ role = ROLES.IDLE, text }: IProps) => {
  const isUser = role === ROLES.USER;

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div className="flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]">
        {role === ROLES.MODEL && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-violet-200 rounded-md flex items-center justify-center">
            <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-violet-800" strokeWidth={2.5} />
          </div>
        )}
        {role === ROLES.ERROR && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-rose-200 rounded-md flex items-center justify-center">
            <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-rose-800" strokeWidth={2.5} />
          </div>
        )}
        <div className="bg-white rounded-sm p-2 sm:p-3">
          <p className="text-black text-xs sm:text-sm leading-relaxed text-left break-words">{text}</p>
        </div>
        {role === ROLES.USER && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-100 rounded-md flex items-center justify-center">
            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-800" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};
