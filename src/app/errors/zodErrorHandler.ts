import { ZodError } from "zod";

const zodErrorHandler = (err: ZodError) => {
  const zodMessage = err.issues.map((issue) => issue.message + ". ").join(". ");
  const zodIssues = err.issues.map((issue) => ({
    field: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  const zodError = { zodMessage, zodIssues };
  return zodError;
};

export default zodErrorHandler;
