export function logError(context: string, error: unknown) {
  console.error(`[${context}] Error:`, error)

  // In production, you could send to a service like Sentry
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to error tracking service (e.g., Sentry)
  }
}

export function logInfo(context: string, message: string, data?: any) {
  console.log(`[${context}] ${message}`, data || '')
}
