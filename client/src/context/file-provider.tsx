import type { FileType } from "@/molecules";
import { createContext, useState, useContext, type ReactNode } from "react";

type FileContextType = {
  file: FileType | null;
  setUploadedFile: (file: FileType) => void;
};

type FileProviderProps = {
  children: ReactNode;
};

export const FileContext = createContext<FileContextType>({
  file: null,
  setUploadedFile: () => {},
});

export const FileProvider = ({ children }: FileProviderProps) => {
  const [file, setFile] = useState<FileType | null>(null);

  const setUploadedFile = (file: FileType) => {
    setFile(file);
  };

  return (
    <FileContext.Provider value={{ file, setUploadedFile }}>
      {children}
    </FileContext.Provider>
  );
};

// Custom hook
export const useUploadedFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useUploadedFile must be used within ThemeProvider");
  }
  return context;
};
