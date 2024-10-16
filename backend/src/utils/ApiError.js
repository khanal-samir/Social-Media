class ApiError extends Error {
  constructor(
    statusCode, // HTTP status code
    message = "Something went wrong", // Default error message
    errors = [], // Additional error details (e.g., validation errors)
    stack = "" // Stack trace (optional)
  ) {
    super(message); // Calls the Error constructor with the message
    this.statusCode = statusCode; // Sets the status code (e.g., 400, 500)
    this.data = null; // Reserved for additional data (optional)
    this.success = false; // Indicates the request was not successful
    this.errors = errors; // Stores any additional error details (e.g., validation errors)
    this.message = message; // Error message (overrides the default if provided)

    if (stack) {
      this.stack = stack; // Use provided stack trace if available
    } else {
      Error.captureStackTrace(this, this.constructor); // Captures the current stack trace
    }
  }
}
export { ApiError };
