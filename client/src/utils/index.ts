import { STATUS } from "@/enums";
import type { FileType } from "@/molecules";
import { GoogleGenAI } from "@google/genai";
import type React from "react";

type IProps = {
  file: FileType;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setSummary: React.Dispatch<React.SetStateAction<string>>;
};

export const generateSumary = async ({
  file,
  setStatus,
  setSummary,
}: IProps) => {
  console.log({
    file,
    setStatus,
    setSummary,
  });
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });

  const contents = [
    {
      text: "Summarize this document, but it should be an advanced summary about the given subject",
    },
    {
      inlineData: {
        mimeType: file.type,
        data: file.file,
      },
    },
  ];

  setStatus(STATUS.LOADING);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    if (response && typeof response.text === "string") {
      setStatus(STATUS.SUCCESS);
      setSummary(response.text);
      console.log(response.text);
    }
  } catch (error) {
    console.log(error);
    setStatus(STATUS.ERROR);
  } finally {
    setStatus(STATUS.IDLE);
    console.log("Summary generation completed.");
  }
};
