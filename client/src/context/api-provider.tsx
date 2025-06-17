import { createContext, useContext, useState, type ReactNode } from "react";

interface APIContextType {
  api: string | null;
  setApiInContext: (value: string) => void;
}

type APIProviderProps = {
  children: ReactNode;
};

const APIContext = createContext<APIContextType>({
  api: "",
  setApiInContext: () => {},
});

export const APIProvider = ({ children }: APIProviderProps) => {
  const [api, setApi] = useState<string>("");

  const setApiInContext = (value: string) => {
    setApi(value);
  };

  return (
    <APIContext.Provider value={{ api, setApiInContext }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPI must be used within APIProvider");
  }
  return context;
};
