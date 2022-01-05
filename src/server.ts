import express from "express";
import BaseRouter from "./routes/v1/Base";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/v1", BaseRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});