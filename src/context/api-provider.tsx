import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface APIContextType {
  api: string | null;
  setApiInContext: (value: string) => void;
}

type APIProviderProps = {
  children: ReactNode;
};

const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider = ({ children }: APIProviderProps) => {
  const [api, setApi] = useState<string | null>(null);

  useEffect(() => {
    const storedApi = localStorage.getItem("api");
    if (storedApi && storedApi.trim() !== "") {
      setApi(storedApi);
    }
  }, []);

  const setApiInContext = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      // Clear API if empty string is provided
      setApi(null);
      localStorage.removeItem("api");
      return;
    }
    setApi(trimmedValue);
    localStorage.setItem("api", trimmedValue);
  };

  return (
    <APIContext.Provider value={{ api, setApiInContext }}>
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("useAPI must be used within APIProvider");
  }
  return context;
};
