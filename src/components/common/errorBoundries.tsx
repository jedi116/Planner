import React, {ErrorInfo} from 'react'

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        const initState: ErrorBoundaryState = {
            hasError: false, error: null
        }
        this.state  = initState;
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error:Error, errorInfo:ErrorInfo) {
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error.stack}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary