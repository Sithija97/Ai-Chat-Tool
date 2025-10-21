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
      <div className="flex items-start gap-3 max-w-[80%]">
        {role === ROLES.MODEL && (
          <div className="flex-shrink-0 w-8 h-8 bg-violet-200 rounded-md flex items-center justify-center">
            <Bot className="w-4 h-4 text-violet-800" strokeWidth={2.5} />
          </div>
        )}
        {role === ROLES.ERROR && (
          <div className="flex-shrink-0 w-8 h-8 bg-rose-200 rounded-md flex items-center justify-center">
            <Bot className="w-4 h-4 text-rose-800" strokeWidth={2.5} />
          </div>
        )}
        <div className="bg-white rounded-sm p-2">
          <p className="text-black text-sm leading-relaxed text-left">{text}</p>
        </div>
        {role === ROLES.USER && (
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
            <User className="w-4 h-4 text-blue-800" strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};
