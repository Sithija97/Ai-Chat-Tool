import { STATUS } from "@/enums";
import type { FileType } from "@/molecules";
import type { GoogleGenAI } from "@google/genai";
import type React from "react";
import { Buffer } from "buffer";

type IProps = {
  ai: GoogleGenAI;
  file: FileType;
  input?: string;
  messages?: {
    role: string;
    text: string;
  }[];
  setMessages?: React.Dispatch<
    React.SetStateAction<
      {
        role: string;
        text: string;
      }[]
    >
  >;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setSummary?: React.Dispatch<React.SetStateAction<string>>;
};

export const generateFile = async (fileObj: File) => {
  const fileUpload = await fileObj.arrayBuffer();

  const file: FileType = {
    name: fileObj.name,
    type: fileObj.type,
    file: Buffer.from(fileUpload).toString("base64"),
    imageUrl: fileObj.type.includes("pdf")
      ? "/pdf-icon.png"
      : URL.createObjectURL(fileObj),
  };
  return file;
};

export const generateSumary = async ({
  ai,
  file,
  setStatus,
  setSummary,
}: IProps) => {
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
    if (response && typeof response.text === "string" && setSummary) {
      setStatus(STATUS.SUCCESS);
      setSummary(response.text);
    }
  } catch (error) {
    console.log(error);
    setStatus(STATUS.ERROR);
  } finally {
    setStatus(STATUS.IDLE);
    console.log("Summary generation completed.");
  }
};

export const generateCoversation = async ({
  ai,
  file,
  input,
  messages,
  setMessages,
  setStatus,
}: IProps) => {
  const contents = [
    {
      text: `Answeer the following question based on the provided document: ${input}.
      Answer with a single or two line and be concise and text only. (no markdwns, tags or symbols).
      Chat history: ${JSON.stringify(messages)}`,
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
      console.log(response.text);
      if (messages && setMessages) {
        setMessages([...messages, { role: "model", text: response.text }]);
      }
    }
  } catch (error) {
    console.log(error);
    setStatus(STATUS.ERROR);
    if (messages && setMessages) {
      setMessages([
        ...messages,
        { role: "error", text: "Error sending messages, Please try again." },
      ]);
    }
  } finally {
    setStatus(STATUS.IDLE);
    console.log("Conversation generation completed.");
  }
};

export const generateStudyGuide = async ({
  ai,
  file,
  setStatus,
  setStudyGuide,
}: IProps & {
  setStudyGuide?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const contents = [
    {
      text: `Generate a comprehensive study guide based on the provided course materials. 
      Include key concepts, important topics, learning objectives, and practice questions with answers.
      If this document is not suitable for creating a study guide (e.g., not educational content, 
      not course materials, or lacks sufficient information), politely inform the user that the 
      document may not be appropriate for generating a study guide.`,
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
    if (response && typeof response.text === "string" && setStudyGuide) {
      setStatus(STATUS.SUCCESS);
      setStudyGuide(response.text);
    }
  } catch (error) {
    console.log(error);
    setStatus(STATUS.ERROR);
    if (setStudyGuide) {
      setStudyGuide("Error generating study guide. Please try again.");
    }
  } finally {
    setStatus(STATUS.IDLE);
    console.log("Study guide generation completed.");
  }
};

export const generateInterviewQuestions = async ({
  ai,
  file,
  setStatus,
  setInterviewQuestions,
}: IProps & {
  setInterviewQuestions?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const contents = [
    {
      text: `Generate challenging interview questions based on the provided document. 
      Create questions that test both knowledge and understanding of the material, including 
      what someone knows and areas they might have missed. Include a mix of technical, 
      conceptual, and practical questions.
      If this document is not suitable for creating interview questions (e.g., not professional 
      or educational content, or lacks sufficient technical depth), politely inform the user 
      that the document may not be appropriate for generating interview questions.`,
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
    if (
      response &&
      typeof response.text === "string" &&
      setInterviewQuestions
    ) {
      setStatus(STATUS.SUCCESS);
      setInterviewQuestions(response.text);
    }
  } catch (error) {
    console.log(error);
    setStatus(STATUS.ERROR);
    if (setInterviewQuestions) {
      setInterviewQuestions(
        "Error generating interview questions. Please try again."
      );
    }
  } finally {
    setStatus(STATUS.IDLE);
    console.log("Interview questions generation completed.");
  }
};
