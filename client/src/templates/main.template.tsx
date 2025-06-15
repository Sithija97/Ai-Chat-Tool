import { ChatWindow } from "@/organisms";

export const MainTemplate = () => {
  return (
    <main className="container">
      {/* <Header /> */}
      {/* {uploadFile ? (
        <Summary file={uploadFile} />
      ) : (
        )} */}
      <ChatWindow />
    </main>
  );
};
