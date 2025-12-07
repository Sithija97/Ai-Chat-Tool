import { STATUS } from "@/enums";
import { Bot } from "lucide-react";

type IProps = {
  status: string;
};
export const CustomLoader = ({ status }: IProps) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]">
        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-violet-200 rounded-md flex items-center justify-center">
          <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-violet-800" strokeWidth={2.5} />
        </div>
        <div
          className={`bg-white rounded-sm py-2 ${
            status === STATUS.LOADING ? "px-5 sm:px-6 md:px-7" : "px-2"
          } `}
        >
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};
