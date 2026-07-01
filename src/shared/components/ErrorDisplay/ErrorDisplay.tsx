import { isAppError } from "@utils/errors"
import styles from "./ErrorDisplay.module.css"

interface ErrorDisplayProps {
  error: unknown
  onRetry?: () => void
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  const appError = isAppError(error) ? error : null

  const getErrorMessage = () => {
    if (appError) {
      switch (appError.code) {
        case "VALIDATION_ERROR":
          return "Please check your input and try again."
        case "NETWORK_ERROR":
          return "Network error. Please check your connection and try again."
        case "AUTH_ERROR":
          return "Please log in to continue."
        case "AUTHORIZATION_ERROR":
          return "You don't have permission to perform this action."
        case "NOT_FOUND":
          return appError.message
        case "BUSINESS_ERROR":
          return appError.message
        default:
          return appError.message
      }
    }
    return "An unexpected error occurred. Please try again."
  }

  const getErrorTitle = () => {
    if (appError) {
      switch (appError.code) {
        case "VALIDATION_ERROR":
          return "Validation Error"
        case "NETWORK_ERROR":
          return "Network Error"
        case "AUTH_ERROR":
          return "Authentication Error"
        case "AUTHORIZATION_ERROR":
          return "Access Denied"
        case "NOT_FOUND":
          return "Not Found"
        case "BUSINESS_ERROR":
          return "Operation Failed"
        default:
          return "Error"
      }
    }
    return "Error"
  }

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>{getErrorTitle()}</h2>
        <p className={styles.errorMessage}>{getErrorMessage()}</p>
        {appError?.details && (
          <details className={styles.errorDetails}>
            <summary>Technical Details</summary>
            <pre>{JSON.stringify(appError.details, null, 2)}</pre>
          </details>
        )}
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
