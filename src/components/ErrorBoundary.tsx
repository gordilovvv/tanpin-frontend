import { Component, ReactNode } from 'react';
import { AppError } from './Layout';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error(error);
        // TODO: add logger
    }

    render() {
        if (this.state.hasError) {
            return <AppError />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;