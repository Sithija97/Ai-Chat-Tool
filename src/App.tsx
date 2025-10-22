import { useEffect, useState } from "react";
import { useAPI } from "./context/api-provider";
import { MainPage } from "./pages";
import { AddApiWindow } from "./organisms/add-api";

const App = () => {
  const { api } = useAPI();
  const [openApiWindow, setOpenApiWindow] = useState<boolean>(false); // Fixed typo

  useEffect(() => {
    if (!api || api.trim() === "") {
      setOpenApiWindow(true);
    } else {
      setOpenApiWindow(false);
    }
  }, [api]);

  const handleApiWindow = () => {
    setOpenApiWindow(!openApiWindow);
  };

  return (
    <>
      <AddApiWindow
        openApiWindow={openApiWindow}
        handleApiWindow={handleApiWindow}
      />
      <section
        className={
          import.meta.env.VITE_ENV === "development" ? "debug-screens" : ""
        }
      >
        <MainPage />
      </section>
    </>
  );
};

export default App;
