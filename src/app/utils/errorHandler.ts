import axios from "axios";

export function handleError(error: unknown): { error: string } {
  if (error instanceof Error) {
    logError("Application Error", error.message);
    return { error: error.message };
  } else {
    logError("Unknown Error", error);
    return { error: "An unexpected error occurred" };
  }
}

export function handleErrorWithAxios(error: unknown): { error: string } {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || "Unknown Axios Error";
    const status = error.response?.status || "No Status";
    
    logError(`Axios Error (Status: ${status})`, message);
    return { error: message };
  } else if (error instanceof Error) {
    logError("Unhandled Error", error.message);
    return { error: error.message };
  } else {
    logError("Unexpected Error Object", error);
    return { error: "An unknown error occurred" };
  }
}

function logError(title: string, details: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[${title}]`, details);
  } else {
    // In production, log to a monitoring service (e.g., Sentry, LogRocket)
    // sendToMonitoringService({ title, details });
  }
}
