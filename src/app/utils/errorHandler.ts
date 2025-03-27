import axios from "axios";
import * as Sentry from "@sentry/nextjs"; // Importera Sentry

export function handleError(error: unknown): { error: string } {
  if (error instanceof Error) {
    logError("Application Error", error);
    return { error: error.message };
  } else {
    logError("Unknown Error", error);
    return { error: "An unexpected error occurred" };
  }
}

export function handleErrorWithAxios(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || "Unknown Axios Error";
    const status = error.response?.status || "No Status";
    
    logError(`Axios Error (Status: ${status})`, message);
  } else if (error instanceof Error) {
    logError("Unhandled Error", error.message);
  } else {
    logError("Unexpected Error Object", error);
  }
}

function logError(title: string, details: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${title}]`, details);
  }

  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(new Error(`${title}: ${JSON.stringify(details)}`));
  }
}