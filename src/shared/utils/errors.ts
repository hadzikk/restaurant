export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any,
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, "VALIDATION_ERROR", 400, details)
  }
}

export class NetworkError extends AppError {
  constructor(message: string, details?: any) {
    super(message, "NETWORK_ERROR", 0, details)
  }
}

export class BusinessError extends AppError {
  constructor(message: string, details?: any) {
    super(message, "BUSINESS_ERROR", 400, details)
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication failed") {
    super(message, "AUTH_ERROR", 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "You don't have permission to perform this action") {
    super(message, "AUTHORIZATION_ERROR", 403)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404)
  }
}

export function isAppError(error: any): error is AppError {
  return error instanceof AppError
}

export function handleError(error: unknown): AppError {
  if (isAppError(error)) {
    return error
  }

  if (error instanceof Error) {
    if (error.message.includes("Network") || error.message.includes("fetch")) {
      return new NetworkError(error.message)
    }
    return new AppError(error.message, "UNKNOWN_ERROR", 500)
  }

  return new AppError("An unknown error occurred", "UNKNOWN_ERROR", 500)
}
