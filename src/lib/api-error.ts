export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

export async function handleApiError(response: Response): Promise<ApiError> {
  let message = "An error occurred";
  let details: string | undefined;

  try {
    const data = await response.json();
    message = data.error || data.message || message;
    details = data.details;
  } catch {
    message = response.statusText || message;
  }

  return {
    status: response.status,
    message,
    details,
  };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}

export const errorMessages: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  401: "You are not authenticated. Please log in.",
  403: "You do not have permission to perform this action.",
  404: "The resource was not found.",
  409: "This resource already exists.",
  422: "Validation error. Please check your input.",
  429: "Too many requests. Please try again later.",
  500: "Server error. Please try again later.",
  503: "Service unavailable. Please try again later.",
};

export function getStatusMessage(status: number): string {
  return errorMessages[status] || "An error occurred";
}
