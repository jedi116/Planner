import React, { ErrorInfo } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: any
}
class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    const initState: ErrorBoundaryState = {
      hasError: false,
      error: null,
    }
    this.state = initState
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

   // eslint-disable-next-line @typescript-eslint/no-empty-function
   componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  render() {
    const { hasError, error } = this.state
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{error.stack}</p>
        </div>
      )
    }

    // eslint-disable-next-line react/prop-types
    return this.props?.children
  }
}

export default ErrorBoundary
