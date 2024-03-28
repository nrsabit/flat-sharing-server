import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// parsers
app.use(cors());
app.use(express.json());

// main route function
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the flat sharing app.");
});

export default app;
