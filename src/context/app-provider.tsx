import { FileProvider } from "./file-provider";
import { APIProvider } from "./api-provider";
import type { ReactNode } from "react";

type IProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: IProps) => {
  return (
    <APIProvider>
      <FileProvider>{children}</FileProvider>
    </APIProvider>
  );
};
