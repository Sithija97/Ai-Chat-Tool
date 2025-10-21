import type { FileType } from "./file-upload";

type IProps = {
  file: FileType;
};

// import.meta.env.VITE_GEMINI_API

export const Summary = ({ file }: IProps) => {
  /* const [summary, setSumary] = useState<string>("");
  const [status, setStatus] = useState<string>(STATUS.IDLE);

  useEffect(() => {
    if (status === STATUS.IDLE && file) {
      generateSumary();
    }
  }, []);

  const renderContent = () => {
    switch (status) {
      case STATUS.LOADING:
        return <LoaderCircle className="animate-spin animate-duration-2000" />;
      case STATUS.SUCCESS:
        return <p>{summary}</p>;
      case STATUS.ERROR:
        return <p>Error generating summary. Please try again.</p>;
      default:
    }
  }; */

  return (
    <section className="summary">
      <img src={file.imageUrl} alt="image preview" />
      <h2>Summary</h2>
      {/* {renderContent()} */}
    </section>
  );
};
