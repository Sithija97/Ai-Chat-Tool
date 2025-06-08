import { GoogleGenAI } from "@google/genai";
import type { FileType } from "./file-upload";

type IProps = {
  file: FileType;
};

// import.meta.env.VITE_GEMINI_API

export const Summary = ({ file }: IProps) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });

  const generateSumary = async () => {
    const contents = [
      { text: "Summarize this document" },
      {
        inlineData: {
          mimeType: file.type,
          data: file.file,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    console.log(response.text);
  };

  generateSumary();

  return (
    <section className="summary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, illo nam.
      Alias, repellat. Repellat perferendis, dolores magnam sunt quos recusandae
      distinctio est quibusdam blanditiis accusamus quis unde, cumque aspernatur
      eaque!
    </section>
  );
};
