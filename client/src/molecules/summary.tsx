import { GoogleGenAI } from "@google/genai";
import type { FileType } from "./file-upload";
import { useEffect, useState } from "react";
import { STATUS } from "@/enums";

type IProps = {
  file: FileType;
};

// import.meta.env.VITE_GEMINI_API

export const Summary = ({ file }: IProps) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });
  const [summary, setSumary] = useState<string>("");
  const [status, setStatus] = useState<string>(STATUS.IDLE);

  const generateSumary = async () => {
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
        setSumary(response.text);
        console.log(response.text);
      }
    } catch (error) {
      console.log(error);
      setStatus(STATUS.ERROR);
    }
  };

  useEffect(() => {
    if (status === STATUS.IDLE && file) {
      generateSumary();
    }
  }, []);

  return (
    <section className="summary">
      <h2>Summary</h2>
      {status === STATUS.LOADING ? <p>loading...</p> : <p>{summary}</p>}
    </section>
  );
};
