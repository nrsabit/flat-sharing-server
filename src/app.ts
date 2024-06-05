import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import notFoundError from "./app/errors/notFoundError";
import routes from "./app/routes";

const app: Application = express();

// parsers
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

// main route function
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the flat sharing app.");
});

// router
app.use("/api", routes);

// global error handler
app.use(globalErrorHandler);

// not found error
app.use(notFoundError);

export default app;
