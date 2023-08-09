import { Component, ReactNode } from 'react';
import { PageError } from './Layout';
import { logError } from '@/utils/sentry';

interface ErrorBoundaryState {
    details?: string,
    hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        details: undefined,
        hasError: false,
    };

    static getDerivedStateFromError() {
        return {
            detail: undefined,
            hasError: true
        };
    }

    componentDidCatch(error: Error) {
        this.setState({ details: error.message ?? undefined });
        logError(error);
    }

    render() {
        if (this.state.hasError) {
            return (<PageError details={this.state.details} />);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;