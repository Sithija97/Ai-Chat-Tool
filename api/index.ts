import express from "express";

const app = express();

app.listen(6000, () => {
    console.log(`Server is listening on port ${6000}`);
  });