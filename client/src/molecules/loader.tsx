import { STATUS } from "@/enums";
import { Bot } from "lucide-react";

type IProps = {
  status: string;
};
export const CustomLoader = ({ status }: IProps) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="flex-shrink-0 w-8 h-8 bg-violet-200 rounded-md flex items-center justify-center">
          <Bot className="w-4 h-4 text-violet-800" strokeWidth={2.5} />
        </div>
        <div
          className={`bg-white rounded-sm py-2 ${
            status === STATUS.LOADING ? "px-7" : "px-2"
          } `}
        >
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};
