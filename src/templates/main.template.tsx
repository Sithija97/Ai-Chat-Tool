import { ChatWindow } from "@/organisms";

export type IMainProps = {
  summary: string;
  setSummary: React.Dispatch<React.SetStateAction<string>>;

  studyGuide: string;
  setStudyGuide: React.Dispatch<React.SetStateAction<string>>;

  interviewQuestions: string;
  setInterviewQuestions: React.Dispatch<React.SetStateAction<string>>;

  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;

  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  messages: { role: string; text: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: string; text: string }[]>
  >;
};

export const MainTemplate = ({
  summary,
  setSummary,
  studyGuide,
  setStudyGuide,
  interviewQuestions,
  setInterviewQuestions,
  status,
  setStatus,
  input,
  setInput,
  messages,
  setMessages,
}: IMainProps) => {
  return (
    <main className="container">
      <ChatWindow
        summary={summary}
        setSummary={setSummary}
        studyGuide={studyGuide}
        setStudyGuide={setStudyGuide}
        interviewQuestions={interviewQuestions}
        setInterviewQuestions={setInterviewQuestions}
        status={status}
        setStatus={setStatus}
        input={input}
        setInput={setInput}
        messages={messages}
        setMessages={setMessages}
      />
    </main>
  );
};
