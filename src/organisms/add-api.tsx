import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/atoms";
import { useAPI } from "@/context/api-provider";
import { useState } from "react";

type IProps = {
  openApiWindow: boolean;
  handleApiWindow: () => void;
};

export const AddApiWindow = ({ openApiWindow, handleApiWindow }: IProps) => {
  const { setApiInContext } = useAPI();
  const [apiValue, setApiValue] = useState("");

  const handleAPIData = (value: string) => {
    setApiValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiValue && apiValue.trim() !== "") {
      setApiInContext(apiValue);
      handleApiWindow();
    }
  };

  return (
    <Dialog open={openApiWindow} onOpenChange={handleApiWindow}>
      <div>
        <DialogContent
          className="sm:max-w-[425px] p-4 sm:p-6"
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Enter your API</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Just drop your API key in below and hit save to get started!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4">
            <div className="grid gap-2 sm:gap-3">
              <Input
                id="api-key"
                name="apiKey"
                value={apiValue}
                onChange={(e) => handleAPIData(e.target.value)}
                placeholder="e.g. AIzaSyXXXXXX..."
                autoComplete="off"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={!apiValue || apiValue.trim() === ""}
              onClick={handleSubmit}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};
